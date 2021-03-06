import { checkNTP } from "../../src/utils";
import { setUp, tearDown } from "../__support__/setup";

beforeAll(async () => {
    await setUp();
});

afterAll(async () => {
    await tearDown();
});

describe("Check NTP", () => {
    const hosts = ["pool.ntp.org", "time.google.com"];
    const host = hosts[0];

    it("should get the time from hosts", async () => {
        const response = await checkNTP([host]);

        expect(response).toBeObject();
        expect(response.host).toBe(host);
        expect(response.time).toBeObject();
        expect(response.time.t).toBeNumber();
    });

    describe("when none of the host could be reached", () => {
        it("produces an error", async () => {
            try {
                await checkNTP(["notime.unknown.not"]);
                throw new Error("An error should have been thrown");
            } catch (error) {
                expect(error.message).toMatch(/ntp.*connect/i);
            }
        });
    });
});
