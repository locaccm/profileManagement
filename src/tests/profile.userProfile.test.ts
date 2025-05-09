import UserProfile from "../models/userProfile";

describe("userProfile model", () => {
  it("should instantiate and return values via getters", () => {
    const profile = new UserProfile(
      999,
      "Doe",
      "John",
      new Date("1990-01-01"),
      "0600000000",
      "123 rue Test",
      "https://example.com/photo.jpg",
      "Bio text",
    );

    expect(profile.getId()).toBe(999);
    expect(profile.getLastName()).toBe("Doe");
    expect(profile.getFirstName()).toBe("John");
    expect(profile.getBirthDate()).toEqual(new Date("1990-01-01"));
    expect(profile.getTel()).toBe("0600000000");
    expect(profile.getAddress()).toBe("123 rue Test");
    expect(profile.getPhotoUrl()).toBe("https://example.com/photo.jpg");
    expect(profile.getBio()).toBe("Bio text");
  });

  it("should update fields using setters", () => {
    const profile = new UserProfile(999)
      .setFirstName("Jane")
      .setLastName("Smith")
      .setBirthDate(new Date("2000-01-01"))
      .setTel("0611223344")
      .setAddress("321 rue Exemple")
      .setPhotoUrl("https://photo.com/jane.jpg")
      .setBio("Nouvelle bio");

    expect(profile.getFirstName()).toBe("Jane");
    expect(profile.getLastName()).toBe("Smith");
    expect(profile.getBirthDate()).toEqual(new Date("2000-01-01"));
    expect(profile.getTel()).toBe("0611223344");
    expect(profile.getAddress()).toBe("321 rue Exemple");
    expect(profile.getPhotoUrl()).toBe("https://photo.com/jane.jpg");
    expect(profile.getBio()).toBe("Nouvelle bio");
  });

  it("should convert to JSON format correctly", () => {
    const profile = new UserProfile(
      5,
      "Test",
      "User",
      new Date("1999-12-31"),
      "0601020304",
      "10 rue JSON",
      "http://img.test",
      "Bio test",
    );

    const json = profile.toJson();
    expect(json).toEqual({
      id: 5,
      lastName: "Test",
      firstName: "User",
      birthDate: new Date("1999-12-31"),
      tel: "0601020304",
      address: "10 rue JSON",
      photoUrl: "http://img.test",
      bio: "Bio test",
    });
  });
});
