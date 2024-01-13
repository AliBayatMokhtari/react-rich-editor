import GlyfEditor from './glyf-editor/Editor';

export { GlyfEditor };

export interface StorageService {
  getString: (key: string) => string | null;
  setString: (key: string, value: string) => void;

  getObject: <T extends object>(key: string) => T | null;
  setObject: <T extends object>(key: string, value: T) => void;

  getBoolean: (key: string) => boolean | null;
  setBoolean: (key: string, value: boolean) => void;
}
