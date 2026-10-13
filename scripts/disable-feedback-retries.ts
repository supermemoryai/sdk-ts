export function disableFeedbackRetries(source: string): string {
  const fetcherStart = "        const _response = await core.fetcher({\n";
  const inheritedRetries = "            maxRetries: requestOptions?.maxRetries ?? this._options?.maxRetries,\n";
  const noRetries = "            maxRetries: 0,\n";
  const start = source.indexOf(fetcherStart);
  const end = source.indexOf("\n        });\n", start);
  const request = source.slice(start, end);

  if (
    !source.includes("export class FeedbackClient {") ||
    source.split("    private async __postFeedback(").length !== 2 ||
    source.split(fetcherStart).length !== 2 ||
    end === -1 ||
    !request.includes('                "feedback",\n') ||
    !request.includes('            method: "POST",\n') ||
    request.split("maxRetries:").length !== 2 ||
    (!request.includes(inheritedRetries) && !request.includes(noRetries))
  ) {
    throw new Error("feedback retry pattern not found once; review the Fern upgrade");
  }

  return source.slice(0, start) + request.replace(inheritedRetries, noRetries) + source.slice(end);
}
