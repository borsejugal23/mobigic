import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

  export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast=useToast()

    const login = async (e) => {
      // e.preventDefault();
      try {
        const res = await fetch("https://mobigic-83ah.onrender.com/users/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        console.log(res)
        const data = await res.json();
       if (res.status===200){
        toast({
          position:"top",
          title: `${data.msg}`,
          status: 'success',
          duration: 3000,
          isClosable: true,

      })
       }
      if (res.status===400){
       return toast({
        position:"top",
          title: `${data.error}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
      })
      }
      if (res.status===200){
        setEmail("");setPassword("");

      }
        console.log(data); 
      } catch (error) {
        
        console.error('Login failed:', error);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      login();
    };
  

    return (
      <div>
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
                
             
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleSubmit}
                  >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      </div>
    );
  }