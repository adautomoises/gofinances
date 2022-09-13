import React from 'react';
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

interface Props {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({title, onPress}: Props){
  return(
      <Container onPress={onPress}>
        <Icon name={icons[title]}/>
        <Category>{title}</Category>
        <Icon name="chevron-down" />
      </Container>
  )
}