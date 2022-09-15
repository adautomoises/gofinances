import "intl";
import "intl/locale-data/jsonp/pt-BR";

import { useFocusEffect } from '@react-navigation/native';

import React, { useState, useEffect, useCallback } from "react";
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
    TransactionList,
    LogoutButton
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const [data, setData] = useState<DataListProps[]>([]);

    async function loadTransactions() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];
        // console.log(dataKey);
        // console.log(response);
        // console.log(transactions);

        const transactionsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {
            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            }
            });

            setData(transactionsFormatted);
    }
    useEffect(() => {
        loadTransactions();
    },[]);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    },[]));

    return (
        <Container>
            <StatusBar style="light" />
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{ uri: "https://avatars.githubusercontent.com/u/74927238?v=4" }}
                        />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Adauto</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={() => { }}>
                        <Icon name="power" />
                    </LogoutButton>
                </UserWrapper>
            </Header>

            <HighLightCards>
                <HighLightCard type="up" title="Entradas" amount="R$ 12.000,00" lastTransaction="Última entrada dia 28 de agosto" />
                <HighLightCard type="down" title="Saídas" amount="R$ 1.259,00" lastTransaction="Última saída dia 22 de agosto" />
                <HighLightCard type="total" title="Total" amount="R$ 10.741,00" lastTransaction="01 à 30 de agosto" />
            </HighLightCards>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={data}
                    keyExtractor={(item: { id: string; }) => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />

            </Transactions>
        </Container>
    )
}