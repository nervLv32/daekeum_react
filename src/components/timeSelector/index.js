import Picker from 'react-scrollable-picker';
import {useState} from '@types/react';

const Index = () => {

  const data = Array.from({length: new Date().getFullYear() - 1999}, (_, i) => i + 2000);
  const [range, setRange] = useState({ title: new Date().getFullYear() });
  const optionGroups = {
    title: data.map((i) => ({ value: i, label: i }))
  };

  return<>
  </>
}

export default Index
