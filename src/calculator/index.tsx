import React, { useCallback, useEffect } from 'react'
import { Box, Center, HStack, VStack, 
  NativeBaseProvider, Text, View, ScrollView
} from 'native-base'
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather';

import {  
  setNum1, setNum2,
  add, sub, division, multiply,
  mStore,
  clearAll,
  mPlus,
  mSub,
  mClear,
} from '../features/calculator/calculatorSlice'

const Calculator = () => {

  const [type, setType] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [check, setCheck] = React.useState(null);

  const { num1, num2, result, mResult, mTotal } = useSelector((state: RootState) => state.calculator)
  const dispatch = useDispatch()

  const memoryArray = [
    {type: 'mClear', value: 'MC'}, 
    {type: 'mRecall', value: 'MR'}, 
    {type: 'mStore', value: 'MS'}, 
    {type: 'mPlus', value: 'M+'}, 
    {type: 'mSub', value: 'M-'}
  ]

  const boxesArray = [
    [ {type: 'operator', value: 'Sq'},
      {type: 'operator', value: 'Sqrt'}, 
      {type: 'operator', value: '%'}, 
      {type: 'operator', value: '÷'}
    ],
    [
      {type: 'number', value: '7'}, 
      {type: 'number', value: '8'}, 
      {type: 'number', value: '9'}, 
      {type: 'operator', value: 'x'}
    ], 
    [
      {type: 'number', value: '4'}, 
      {type: 'number', value: '5'}, 
      {type: 'number', value: '6'}, 
      {type: 'operator', value: '-'}
    ],
    [
      {type: 'number', value: '1'}, 
      {type: 'number', value: '2'}, 
      {type: 'number', value: '3'}, 
      {type: 'operator', value: '+'}
    ],
    [
      {type: 'number', value: '0'}, 
      {type: 'operator', value: '00'}, 
      {type: 'operator', value: '.'}, 
      {type: 'operator', value: '='}
    ]
  ]

  const clear = () => {
    dispatch(clearAll())
    setType(null);
    setShow(false);
    setCheck(null)
  }

  const deleteNum = () => {
    if (check === 'num1') {
      const lastIndex = num1.substring(0, num1.length-1);
      dispatch(setNum1({num1: '', result: lastIndex}));
    } else {
      const lastIndex = num2.substring(0, num2.length-1);
      dispatch(setNum2({num2: '', result: lastIndex}));
    }
  }

  const commonArray = [
    {type: clear, value: 'C'}, 
    {type: clear, value: 'C'}, 
    {type: deleteNum, value: 'delete'},
  ]

  const setFirstNumber = useCallback((value: string) => {
    dispatch(setNum1({num1: value, result: null}))
    setCheck("num1")
  }, [result])

  const calculate = () => {
    type === '+' && dispatch(add(num2));
    type === '-' && dispatch(sub(num2));
    type === 'x' && dispatch(multiply(num2));
    type === '÷' && dispatch(division(num2));
    setShow(true);
  }

  const setTypeOrCal = (type: any) => {
    if (result !== null) {
      dispatch(setNum1({num1: '', result: result}));
      setType(type)
      setShow(false) 
      dispatch(setNum2({num2: null, result: null}));
      setCheck('num1')
    } else {
      setType(type)
    }
  }

  const operatorType = (type: any) => {
    type === '=' ? calculate() : setTypeOrCal(type)
  }

  const checkNumOrFunc = (box: any) => {
    if (box?.type === 'operator' ) {
      operatorType(box?.value)
    } else {
      dispatch(setNum2({num2: box?.value, result: null})) 
      setCheck('num2')
    }
  }

  const memoCall = (type: any) => {
    type === 'mStore' && dispatch(mStore(result));
    type === 'mPlus' && dispatch(mPlus(result));
    type === 'mSub' && dispatch(mSub(result));
    type === 'mClear' && dispatch(mClear());
    if (type === 'mRecall' ) {
      clear();
      dispatch(setNum1({num1: '', result: mTotal}))
    }
  }

  return (
    <NativeBaseProvider>
      <Box
        justifyItems='space-between'
        flex="1"
      >
        <View flex="1" px={6}
          style={{
            alignSelf: 'flex-end'
          }}
          justifyContent="flex-end"
        >
          <Box>
            <Text color="#fff">
              {type !== null && `${num1} ${type}`}
              {num2 !== null && ` ${num2}` }
              {show && '='}
            </Text>
          </Box>
          <Box>
            <Text color="#fff" fontSize="4xl" fontWeight="bold">
              { result !== null ? result : num2 !== ('' && null) ? num2 : num1 === ('' && null) ? 0 : num1}
            </Text>
          </Box>
        </View>
        <View style={styles.num_box}>
          <HStack space={3} 
            justifyContent="space-around"
            p={2}
          >
            {
              memoryArray.map((memo, memoIndex) => 
                <Pressable 
                  onPress={() => memoCall(memo.type)}
                  key={`{memo_${memo}_${memoIndex}}`}
                >
                  <Center>
                    <Text color="white">
                      {memo.value}
                    </Text>
                  </Center>
                </Pressable>
              )
            }
          </HStack>
          <VStack
            space={1} 
            justifyContent="space-around"
          >
            <HStack
              space={3} 
              justifyContent="space-around"
            >
              {
                commonArray.map((com, comIndex) => 
                  com?.value === 'delete' ?
                  <Pressable onPress={() => deleteNum()}>
                    <Center pt="2">
                      <Icon 
                        name="delete" 
                        size={30} 
                        color="#fff"
                      />
                    </Center>
                  </Pressable>
                  :
                  <Pressable
                    onPress={() => clear()}
                    key={`num_${comIndex}`}
                  >
                    <Center 
                      bg={com === null ? "translate" : "white"} 
                      w="20" h="12" rounded="lg"
                      key={`num_${comIndex}`}
                    >
                      <Text color="black">
                        {com?.value}
                      </Text>
                    </Center>
                  </Pressable>
                )
              }
            </HStack>
            {
              boxesArray.map((boxes, index) => 
              <HStack
                space={2} 
                key={`num_${index}`}
                justifyContent="space-around"
                p={1}
              >
                {
                  boxes.map((box, num_index) => 
                    <Pressable
                      onPress={() => box?.type === 'number' && type === null ? setFirstNumber(box?.value) : checkNumOrFunc(box)}
                      key={`num_${num_index}`}
                    >
                      <Center 
                        bg={box === null ? "translate" : "white"} 
                        w="20" h="12" rounded="lg"
                        key={`num_${num_index}`}
                      >
                        <Text color="black" fontSize="lg">
                          {box?.value}
                        </Text>
                      </Center>
                    </Pressable>
                  )
                }
              </HStack>
              )
            }
          </VStack>
        </View>
      </Box>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  num_box: {
    justifyContent: 'flex-end'
  }
})

export default Calculator