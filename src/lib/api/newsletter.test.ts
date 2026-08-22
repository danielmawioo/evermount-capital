import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { newsletter } from "./newsletter";

describe("newsletter api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("subscribe posts the email to the waitlist endpoint", async () => {
    const data = { email: "subscriber@example.com" };
    mock.onPost("/waitlist").reply(201, { success: true });

    const response = await newsletter.subscribe(data);

    expect(response.data).toEqual({ success: true });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });
});
