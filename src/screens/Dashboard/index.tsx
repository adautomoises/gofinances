import React from "react";
import { StatusBar } from 'expo-status-bar';
import { HighLightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { 
    Container, 
    Header, 
    UserWrapper, 
    UserInfo, 
    Photo, 
    User, 
    UserGreeting, 
    UserName, 
    Icon, 
    HighLightCards, 
    Transactions, 
    Title, 
    TransactionList 
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const data: DataListProps[] = [
    {
        id: '1',
        type: 'positive',
        title:"Desenvolvimento de app",
        amount:"R$ 12.000,00",
        category: {
            name: 'Vendas',
            icon: 'dollar-sign'
         },
        date: "28/08/2022"
    },{
        id: '2',
        type: 'negative',
        title:"Amigão Benfica",
        amount:"R$ 59,00",
        category: {
            name: 'Alimentos',
            icon: 'coffee'
         },
        date: "22/08/2022"
    },{
        id: '3',
        type: 'negative',
        title:"Aluguel do Apartamento",
        amount:"R$ 1.200,00",
        category: {
            name: 'Casa',
            icon: 'home'
         },
        date: "01/08/2022"
    }
    ];

return (
    <Container>
    <StatusBar style="light" />
    <Header>
        <UserWrapper>
            <UserInfo>
                <Photo 
                    source={{uri: "https://avatars.githubusercontent.com/u/74927238?v=4"}}
                    />
                <User>
                    <UserGreeting>Olá,</UserGreeting>
                    <UserName>Adauto</UserName>
                </User>
            </UserInfo>
            <Icon name="power"/>
        </UserWrapper>
    </Header>

    <HighLightCards>
        <HighLightCard type="up" title="Entradas" amount="R$ 12.000,00" lastTransaction="Última entrada dia 28 de agosto"/>
        <HighLightCard type="down" title="Saídas" amount="R$ 1.259,00" lastTransaction="Última saída dia 22 de agosto"/>
        <HighLightCard type="total" title="Total" amount="R$ 10.741,00" lastTransaction="01 à 30 de agosto"/>
    </HighLightCards>

    <Transactions>
        <Title>Listagem</Title>
        <TransactionList 
            data={data}
            keyExtractor = {(item: { id: string; }) => item.id}
            renderItem={({item}) => <TransactionCard data={item}/>}
        />

    </Transactions>
  </Container>
)
}