import React from 'react';
import { 
  Container, 
  Category, 
  Icon 
} from './styles';

const icon = {
  Compras: 'shopping-bag',
  Alimentação:  'coffee',
  Salário: 'dollar-sign',
  Carro: 'crosshair',
  Lazer: 'heart',
  Estudos: 'book',
};

interface Props {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({title, onPress}: Props){
  return(
    <Container onPress={onPress}>
      <Icon name={icon[title]}/>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  )
}