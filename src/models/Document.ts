import { Entity } from "./Entity";
import { IconType } from "./Route";

interface DocumentEntity extends Entity {
  icon: string;
  iconPrefix: string;
  iconType: IconType;
  indent?: boolean;
}

export interface Card extends DocumentEntity {
  header: string;
  body: string;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  externalLinks?: string[];
  details?: string[];
}

export interface HistoryEvent {
  startDate: Date | string;
  endDate: Date | string;
  details: string[];
}

export interface HistoryCard extends Card {
  events: (HistoryEvent & Card)[];
}

export interface Divider extends DocumentEntity {
  header: string;
}
export interface ParentEntity extends DocumentEntity {
  children: DocumentEntityType[];
}

export type DocumentEntityType = Card | Divider | HistoryCard | ParentEntity;

export interface Document {
  sections: DocumentEntityType[];
}

export interface DocumentConfiguration extends Entity {
  document: Document;
}
