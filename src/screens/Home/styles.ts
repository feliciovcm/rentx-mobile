import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Car as CarDTO } from '../../dtos/carDTO';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;

  justify-content: flex-end;

  background-color: ${({ theme }) => theme.colors.header};

  padding: 32px 24px;
`;

export const HeaderContent = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};


  font-family: ${({ theme }) => theme.fonts.primary_400};
`;

export const CarList = styled(FlatList as new () => FlatList<CarDTO>).attrs({
  contentContainerStyle: {
    padding: 24
  },
  showsVerticalScrollIndicator: false
})``

export const MyCarsButton = styled(RectButton)`
  width: 60px;
  height: 60px;

  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.main};
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 22px;
  bottom: 13px;
`;
