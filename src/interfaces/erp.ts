export interface Pageable<T> {
  total: number;
  result: T[];
}

interface DefaultProperties {
  doc_id?: number;
  doc_createdDate?: Date;
  doc_createdBy?: string;
  doc_lastModifiedDate?: Date;
  doc_lastModifiedBy?: string;
}

export interface Language extends DefaultProperties {
  name: string;
}

export interface Content extends DefaultProperties {
  title: string;
  content: string;
}

export interface Notification extends DefaultProperties {
  icon: string;
  title: string;
  message: string;
  sentTime: Date | string;
}
