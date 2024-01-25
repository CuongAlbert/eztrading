export type NavigationItem = {
  title: string;
  links:
    | {
        title: string;
        href: string;
        desc: string;
        isHighlighted?: boolean;
      }[]
    | string;
};

export type ApiResponse<T> =
  | {
      success: true;
      data: T[];
    }
  | {
      success: false;
      error: string;
    };
