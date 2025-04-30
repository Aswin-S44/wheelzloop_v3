import { check, group } from "k6";
import http from "k6/http";

const devBackend = "http://localhost:5000";

const randomDigit = Math.floor(Math.random() * 1000000 + 1);
export default function () {
  group("Checking signin", function () {
    let loginRes = http.post(`${devBackend}/api/v1/user/signup`, {
      username: "AswinS",
      first_name: "AswinS",
      last_name: "AswinS",
      phone: "+124456s819",
      password: "444444",
      email: `aswin.s.ts.s04${randomDigit}@gmail.com`,
      business_name: "Doe Motors",
      location: "New York, USA",
      address: "123 Main St, New York, NY 10001",
      profile_picture: "https://example.com/profile.jpg",
      has_physical_store: true,
      role: "company",
      verified: true,
      subscribed: true,
      subscription_expires_at: "2025-01-01T00:00:00.000Z",
      post_count: 5,
      expired_listings_count: 2,
      deactivated: false,
      created_at: "2024-03-14T10:00:00.000Z",
      last_active: "2024-03-14T12:00:00.000Z",
    });
    check(loginRes, { "Login status is 200": (r) => r.status === 200 });
  });

  // Check get cars api
  //   group("Cheking get all cars", function () {
  //     let res = http.get(`${devBackend}/api/v1/user/cars`);
  //     check(res, { "Get all cars status is 200": (r) => r.status === 200 });
  //   });
}
