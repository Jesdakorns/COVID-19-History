import {SyntheticEvent, useState} from 'react';

const useTab = (valueTab: string) => {
  const [tab, setTab] = useState(valueTab);
  const handleChange = (event: SyntheticEvent, newTab: string) => {
    setTab(newTab);
  };
  return {tab, handleChange};
};

export default useTab;
