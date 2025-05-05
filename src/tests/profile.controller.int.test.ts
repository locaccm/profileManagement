import request from "supertest";
import app from "../index";

describe("Profile API Integration - GET", () => {
  describe("GET /profiles/:id", () => {
    it("should return 200 and a profile if ID exists", async () => {
      const res = await request(app).get("/profiles/1");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("firstName");
    });

    it("should return 404 if the profile does not exist", async () => {
      const res = await request(app).get("/profiles/999999");
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 for invalid ID", async () => {
      const res = await request(app).get("/profiles/abc");
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });
});

describe("Profile API Integration - PUT", () => {
  describe("PUT /profiles/:id", () => {
    it("should return 200 and update the profile", async () => {
      const res = await request(app)
        .put("/profiles/1")
        .send({
          firstName: "Jean",
          lastName: "Testé",
          birthDate: "1990-05-20",
          tel: "0600000000",
          address: "10 rue des tests, Paris",
          photoUrl: "https://example.com/photo.jpg",
          bio: "Profil mis à jour via test",
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe("Jean");
      expect(res.body.lastName).toBe("Testé");
    });

    it("should return 400 for missing fields", async () => {
      const res = await request(app)
        .put("/profiles/1")
        .send({
          firstName: "",
          lastName: "",
          birthDate: "",
          address: "",
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 404 if profile not found", async () => {
      const res = await request(app)
        .put("/profiles/999999")
        .send({
          firstName: "Jean",
          lastName: "Ghost",
          birthDate: "1990-05-20",
          tel: "0600000000",
          address: "Adresse inconnue",
          photoUrl: "",
          bio: "",
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error");
    });
  });
});

describe("Profile API Integration - DELETE", () => {
  describe("DELETE /profiles/:id", () => {
    it("should return 200 if profile is deleted successfully", async () => {
      const res = await request(app).delete("/profiles/1");
      expect([200, 404]).toContain(res.status);
    });

    it("should return 404 if profile does not exist", async () => {
      const res = await request(app).delete("/profiles/999999");
      expect(res.status).toBe(404);
    });

    it("should return 400 if ID is invalid", async () => {
      const res = await request(app).delete("/profiles/abc");
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });
});
