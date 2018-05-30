const { QueryTypes } = require('sequelize')

module.exports = class QueryBuiler {
  constructor (connection) {
    this.connection = connection
  }

  select (columns = '*', escape = true) {
    this.queryType = QueryTypes.SELECT

    if (columns === '*') {
      this.query = 'SELECT *'

      return this
    }

    if (Array.isArray(columns)) {
      this.query = escape
        ? `SELECT "${columns.join('","')}"`
        : `SELECT ${columns.join(',')}`
    } else {
      this.query = escape
        ? `SELECT "${columns}"`
        : `SELECT ${columns}`
    }

    return this
  }

  withCount (column, alias = 'count') {
    this.query += `,COUNT (DISTINCT ${column}) AS ${alias}`

    return this
  }

  from (table) {
    this.query += ` FROM ${table}`

    return this
  }

  as (alias) {
    this.query += ` AS ${alias}`

    return this
  }

  where (column, value, operator = '=') {
    this.query += ` WHERE "${column}" ${operator} '${value}'`

    return this
  }

  whereRaw (query) {
    this.query += ` WHERE ${query}`

    return this
  }

  whereBetween (column, from, to) {
    this.query += ` WHERE "${column}" >= '${from}' AND "${column}" <= '${to}'`

    return this
  }

  whereLike (column, value) {
    this.query += ` WHERE "${column}" LIKE '%${value}%'`

    return this
  }

  whereIn (column, value) {
    if (Array.isArray(value)) {
      value = value.join('\',\'')
    }

    this.query += ` WHERE "${column}" IN ('${value}')`

    return this
  }

  whereNotIn (column, value) {
    if (Array.isArray(value)) {
      value = value.join('\',\'')
    }

    this.query += ` WHERE "${column}" NOT IN ('${value}')`

    return this
  }

  whereNotNull (column) {
    this.query += ` WHERE "${column}" IS NOT NULL`

    return this
  }

  whereKeyValuePairs (conditions) {
    const formattedConditions = []

    for (const [key, value] of Object.entries(conditions)) {
      formattedConditions.push(`"${key}" = '${value}'`)
    }

    if (formattedConditions.length) {
      this.query += ` WHERE ${formattedConditions.join(' AND ')}`
    }

    return this
  }

  whereStruct (conditions) {
    const formattedConditions = []

    for (const condition of Object.values(conditions)) {
      if (!condition.key) {
        continue
      }

      formattedConditions.push(`"${condition.key}" ${condition.operator} '${condition.value}'`)
    }

    if (formattedConditions.length) {
      this.query += ` WHERE ${formattedConditions.join(' AND ')}`
    }

    return this
  }

  orWhere (column, value, operator = '=') {
    this.query += ` OR "${column}" ${operator} '${value}'`

    return this
  }

  andWhere (column, value, operator = '=') {
    this.query += ` AND "${column}" ${operator} '${value}'`

    return this
  }

  groupBy (column) {
    this.query += ` GROUP BY "${column}"`

    return this
  }

  sortBy (column, direction) {
    this.query += ' ORDER BY '

    if (column === Object(column)) {
      const criteria = []

      for (const [key, value] of Object.entries(column)) {
        criteria.push(`"${key}" ${value.toUpperCase()}`)
      }

      this.query += criteria.join(',')
    } else {
      this.query += `"${column}" ${direction.toUpperCase()}`
    }

    return this
  }

  take (value) {
    this.query += ` LIMIT ${value}`

    return this
  }

  skip (value) {
    this.query += ` OFFSET ${value}`

    return this
  }

  all () {
    return this.connection.query(this.query, {
      type: this.queryType
    })
  }

  raw (query) {
    return this.connection.query(query, {
      type: this.queryType
    })
  }

  async first () {
    const data = await this.all()

    return data[0]
  }
}