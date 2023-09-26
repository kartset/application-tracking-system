import React from 'react';
import {
    Box, Text, HStack,
    useColorModeValue, useRadioGroup, 
    useRadio, UseRadioProps
} from '@chakra-ui/react';


export const CustomTabs:React.FC<any> = ({getter, setter, options}) => {

    const { getRadioProps } = useRadioGroup({
        name: 'displayType',
        defaultValue: "editor",
        onChange: setter
    });


    return (
        <Box
            overflow="hidden"
            position="relative"
            borderRadius="md"
            border="none"
            alignItems="center"
            justifyContent="center"
            p={1}
            mt={2}
            bg={useColorModeValue('gray.200', 'gray.700')}
            color={useColorModeValue('blackAlpha.500', 'whiteAlpha.600')}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
            <HStack>
                {options.map((value:any) => {
                    const label = value.value;
                    const radio = getRadioProps({ value: label });
                    return (
                    <RadioCard key={value.label} {...radio}>
                        <HStack spacing={1}>
                        {/* <Icon as={value.icon} w={6} h={6} /> */}
                        <Text fontSize="sm">{value.label}</Text>
                        </HStack>
                    </RadioCard>
                    );
                })}
            </HStack>
        </Box>
    );
};


type RadioCardProps = {
  children: React.ReactNode;
} & UseRadioProps;

const RadioCard: React.FC<RadioCardProps> = (props) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const radio = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...radio}
        cursor="pointer"
        borderRadius="md"
        border="none"
        _checked={{
          bg: useColorModeValue('white', 'whiteAlpha.300'),
          color: useColorModeValue('black', 'white'),
          borderRadius: 'md',
          boxShadow: 'md'
        }}
        py={2}
        px={4}
      >
        {props.children}
      </Box>
    </Box>
  );
};
export default RadioCard;
