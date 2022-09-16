import "intl";
import "intl/locale-data/jsonp/pt-BR";

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
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
  LogoutButton,
  LoadContainer
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighLightProps {
  amount: string;
  lastTransaction: string;
}
interface HighLightData {
  entries: HighLightProps;
  expensives: HighLightProps;
  total: HighLightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighLightData] = useState<HighLightData>({} as HighLightData);
  const theme = useTheme();

  function getLastTransactionDate(
    collection: DataListProps[], 
    type: 'positive' | 'negative'
    ){
    const lastTransaction = new Date(
    Math.max.apply(Math, collection
    .filter(transactions => transactions.type === type)
    .map(transactions => new Date(transactions.date).getTime())));
    
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {month: "long"})}`
  }

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];
    // console.log(dataKey);
    // console.log(response);
    // console.log(transactions);

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {

        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

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

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
    const totalInterval = `01 a ${lastTransactionExpensives}`;

    const total = entriesTotal - expensiveTotal;
    setHighLightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensives}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval
      }
    })
    setIsLoading(false);
  }
  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      {
        isLoading ? 
          <LoadContainer>
            <ActivityIndicator color={theme.colors.primary} size="large" /> 
          </LoadContainer> :
        <>
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
            <HighLightCard type="up" title="Entradas" amount={highlightData.entries.amount} lastTransaction={highlightData.entries.lastTransaction} />
            <HighLightCard type="down" title="Saídas" amount={highlightData.expensives.amount} lastTransaction={highlightData.expensives.lastTransaction} />
            <HighLightCard type="total" title="Total" amount={highlightData.total.amount} lastTransaction={highlightData.total.lastTransaction} />
          </HighLightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={(item: { id: string; }) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />

          </Transactions>
        </>
      }
    </Container>
  )
}