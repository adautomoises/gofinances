import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { 
  Container, 
  Category, 
  Icon 
} from './styles';

const icons = {
  Compras: 'shopping-bag',
  Alimentação: 'coffee',
  Salário: 'dollar-sign',
  Carro: 'crosshair',
  Lazer: 'heart',
  Estudos: 'book',
};

interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({
  title, 
  onPress, 
  testID
}: Props){
  return(
      <Container onPress={onPress} testID={testID}>
        <Icon name={icons[title]}/>
        <Category>{title}</Category>
        <Icon name="chevron-down" />
      </Container>
  )
}