  import { initEdit } from '../components/type';
  export default {
    write(key: string, value: any) {
      if (value) {
        value = JSON.stringify(value);
      }
      localStorage.setItem(key, value);
    },
    read<initEdit>(key: string): initEdit | [] {
      const value: string | null = localStorage.getItem(key);
      if (value && value != 'undefined' && value != 'null') {
          return JSON.parse(value) as initEdit;
      }
      return [];
    },
  };