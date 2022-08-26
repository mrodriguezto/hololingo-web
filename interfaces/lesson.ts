export interface INewLesson {
  title: string;
  description: string;
  example: string;
  category_name: string;
}
export interface ILesson extends INewLesson {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IExtendedLesson extends ILesson {
  id: number;
}
