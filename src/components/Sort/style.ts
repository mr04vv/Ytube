import { COLOR_LIGHT_GRAY, COLOR_MAIN_TEXT } from 'constants/colors';
import styled from 'styled-components';

export const OrderContainer = styled.div`
  margin: 0 30px;
  display: flex;
`;

interface OrderItemProps {
  selected: boolean;
}

export const OrderItem = styled.div<OrderItemProps>`
  font-size: 13px;
  color: ${(props) => (props.selected ? COLOR_MAIN_TEXT : COLOR_LIGHT_GRAY)};
  margin-right: 20px;
  cursor: pointer;
`;
