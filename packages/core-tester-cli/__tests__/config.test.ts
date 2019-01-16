import "jest-extended";
import { config } from "../src/config";

describe("Config", () => {
    it("should have specific data", () => {
        expect(config).toEqual({
            apiPort: 4103,
            p2pPort: 4100,
            baseUrl: "http://localhost",
            passphrase: "prison tobacco acquire stone dignity palace note decade they current lesson robot",
            secondPassphrase: "",
        });
    });
});
