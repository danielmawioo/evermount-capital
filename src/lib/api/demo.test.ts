import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { demo } from "./demo";

describe("demo api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("getBookedSlots resolves with booked slots", async () => {
    const slots = ["2024-05-01T10:00:00Z"];
    mock.onGet("/booked-demo-slots").reply(200, { slots });

    const response = await demo.getBookedSlots();

    expect(response.data).toEqual({ slots });
    expect(mock.history.get[0].url).toBe("/booked-demo-slots");
  });

  it("book posts booking details", async () => {
    const data = {
      fullName: "Jane Doe",
      email: "jane@example.com",
      company: "Acme Inc",
      preferredDateTime: "2024-05-01T10:00:00Z",
      message: "Looking forward to it",
    };
    mock.onPost("/demo-booking").reply(201, { id: "d1" });

    const response = await demo.book(data);

    expect(response.data).toEqual({ id: "d1" });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("book works with only required fields", async () => {
    const data = {
      fullName: "Jane Doe",
      email: "jane@example.com",
      preferredDateTime: "2024-05-01T10:00:00Z",
    };
    mock.onPost("/demo-booking").reply(201, { id: "d2" });

    const response = await demo.book(data);

    expect(response.data).toEqual({ id: "d2" });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });
});
