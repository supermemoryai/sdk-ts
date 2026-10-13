import { expect, test } from "bun:test";
import { disableFeedbackRetries } from "../scripts/disable-feedback-retries.ts";

const filename = new URL("../src/generated/api/resources/feedback/client/Client.ts", import.meta.url);
const generated = await Bun.file(filename).text();
const safe = "            maxRetries: 0,\n";
const inherited = "            maxRetries: requestOptions?.maxRetries ?? this._options?.maxRetries,\n";
const fernOutput = generated.replace(safe, inherited);

test("feedback postprocessor changes only the generated endpoint retry option", () => {
  expect(fernOutput).not.toBe(generated);
  expect(disableFeedbackRetries(fernOutput)).toBe(generated);
  expect(disableFeedbackRetries(disableFeedbackRetries(fernOutput))).toBe(generated);
});

for (const [name, fixture] of [
  ["missing retry option", fernOutput.replace(inherited, "")],
  ["duplicate retry option", fernOutput.replace(inherited, inherited + inherited)],
  ["unexpected retry expression", fernOutput.replace(inherited, "            maxRetries: requestOptions?.maxRetries,\n")],
  ["renamed client", fernOutput.replace("class FeedbackClient", "class OtherClient")],
  ["renamed method", fernOutput.replace("private async __postFeedback(", "private async __other(")],
  ["changed route", fernOutput.replace('"feedback",', '"other",')],
  ["changed HTTP method", fernOutput.replace('method: "POST"', 'method: "GET"')],
  ["duplicate fetcher", fernOutput + "        const _response = await core.fetcher({\n"],
  ["unterminated fetcher", fernOutput.replace("        });\n", "")],
  ["missing file content", ""],
] as const) {
  test(`feedback postprocessor fails closed on ${name}`, () => {
    expect(() => disableFeedbackRetries(fixture)).toThrow("review the Fern upgrade");
  });
}
