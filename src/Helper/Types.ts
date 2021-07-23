export type StampCardType = {
  id?: string;
  title: string;
  complete: Boolean;
  date_of_creation: Date;
  date_of_completed?: Date;
  completed_image?: string;
};

export interface SectionPart extends StampCardType {
  content: StampType[] | null | undefined;
}

export type StampType = {
  id?: string;
  number: number;
  name: string | null | undefined;
  image: string | null | undefined;
  picture: string | null | undefined;
  done: Boolean;
  date: Date | undefined;
  description: string | null | undefined;
  stampCard: StampCardType;
};

export type UserType = {
  id?: number;
  name: string | null | undefined;
  rank: number;
};

export type QRCodeObject = {
  url: string;
  date: string;
  description: string;
  name: string;
  picture: string | null | undefined;
};
export type QRCodeReturnData = {
  image: string;
  description: string;
  date: Date;
  done: boolean;
  name: string;
};
