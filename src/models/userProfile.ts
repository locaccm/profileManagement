import { User as UserDb } from "@prisma/client";

class UserProfile {
  constructor(
    private readonly USEN_ID: number,
    private USEC_LNAME?: string,
    private USEC_FNAME?: string,
    private USED_BIRTH?: Date,
    private USEC_TEL?: string,
    private USEC_ADDRESS?: string,
    private USEC_URLPP?: string,
    private USEC_BIO?: string,
  ) {}

  public static fromDb(userDb: Partial<UserDb>): UserProfile {
    return new UserProfile(
      userDb.USEN_ID!,
      userDb.USEC_LNAME ?? undefined,
      userDb.USEC_FNAME ?? undefined,
      userDb.USED_BIRTH ?? undefined,
      userDb.USEC_TEL ?? undefined,
      userDb.USEC_ADDRESS ?? undefined,
      userDb.USEC_URLPP ?? undefined,
      userDb.USEC_BIO ?? undefined,
    );
  }

  // Getter JSON for API response
  public toJson() {
    return {
      id: this.USEN_ID,
      lastName: this.USEC_LNAME,
      firstName: this.USEC_FNAME,
      birthDate: this.USED_BIRTH,
      tel: this.USEC_TEL,
      address: this.USEC_ADDRESS,
      photoUrl: this.USEC_URLPP,
      bio: this.USEC_BIO,
    };
  }

  // ---- GETTERS ----
  public getId(): number {
    return this.USEN_ID;
  }

  public getLastName(): string | undefined {
    return this.USEC_LNAME;
  }

  public getFirstName(): string | undefined {
    return this.USEC_FNAME;
  }

  public getBirthDate(): Date | undefined {
    return this.USED_BIRTH;
  }

  public getTel(): string | undefined {
    return this.USEC_TEL;
  }

  public getAddress(): string | undefined {
    return this.USEC_ADDRESS;
  }

  public getPhotoUrl(): string | undefined {
    return this.USEC_URLPP;
  }

  public getBio(): string | undefined {
    return this.USEC_BIO;
  }

  // ---- SETTERS ----
  public setLastName(lastName: string): this {
    this.USEC_LNAME = lastName;
    return this;
  }

  public setFirstName(firstName: string): this {
    this.USEC_FNAME = firstName;
    return this;
  }

  public setBirthDate(birthDate: Date): this {
    this.USED_BIRTH = birthDate;
    return this;
  }

  public setTel(tel: string): this {
    this.USEC_TEL = tel;
    return this;
  }

  public setAddress(address: string): this {
    this.USEC_ADDRESS = address;
    return this;
  }

  public setPhotoUrl(photoUrl: string): this {
    this.USEC_URLPP = photoUrl;
    return this;
  }

  public setBio(bio: string): this {
    this.USEC_BIO = bio;
    return this;
  }
}

export default UserProfile;
