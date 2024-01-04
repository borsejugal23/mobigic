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
import { useReducer } from 'react';
import { useToast } from '@chakra-ui/react';
const initialState={
        name:"",
        username:"",
        email:"",
        phone:"",
        password:""
}

const reducer=(state,{type,payload})=>{
  switch (type) {
    case 'NAME':
      return { ...state, name: payload };
    case 'USERNAME':
      return { ...state, username: payload };
    case 'EMAIL':
      return { ...state, email: payload };
    case 'PHONE':
      return { ...state, phone: payload };
    case 'PASSWORD':
      return { ...state, password: payload };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
  };

export default function Signup() {
  const [state, dispatch] = useReducer(reducer,initialState);
   
    const toast=useToast()
  const handleSubmit = async(e) => {
          e.preventDefault();
          
                const formData = {...state};
              
                  fetch("https://mobigic-83ah.onrender.com/users/register", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log('Registration successful:', data);
                      if (data.msg==="Registered successfully"){
                        toast({
                          position:"top",
                          title: `${data.msg}`,
                          status: 'success',
                          duration: 3000,
                          isClosable: true,
                      })

                      }
                      else if (data.msg!=="Registered successfully"){
                        toast({
                          position:"top",
                          title: `${data.msg}`,
                          status: 'error',
                          duration: 3000,
                          isClosable: true,
                      })

                      }
                      
                      dispatch({type:"RESET"})
                
                    })
                    .catch((error) => {
                      console.error('Registration failed:', error);
                      toast({
                        position:"top",
                        title: `${error.error}`,
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    })
                    });
            
         
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
          <Heading fontSize={'4xl'}>Sign up your account</Heading>
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

            < FormControl isRequired id="name">
              <FormLabel>Name</FormLabel>
              <Input type="name" value={state.name}onChange={(e)=>dispatch({type:"NAME",payload:e.target.value})}required/>
            </FormControl>

            < FormControl isRequired id="Username"  >
              <FormLabel>Username</FormLabel>
              <Input type="name" value={state.username} onChange={(e)=>dispatch({type:"USERNAME",payload:e.target.value})} required/>

            </FormControl>

            < FormControl isRequired id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={state.email}onChange={(e)=>dispatch({type:"EMAIL",payload:e.target.value})} required/>
            </FormControl>

            < FormControl isRequired id="Phone Number">
              <FormLabel>Phone Number</FormLabel>
              <Input type="number" value={state.phone}onChange={(e)=>dispatch({type:"PHONE",payload:e.target.value})}required/>
            </FormControl>
            < FormControl isRequired id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={state.password}onChange={(e)=>dispatch({type:"PASSWORD",payload:e.target.value})} required/>
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



