import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
// import axios from "../api/axios";
import {
    Alert,
    AlertTitle,
    Box, Button, CircularProgress,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel, makeStyles, MenuItem,
    OutlinedInput, Pagination, Select,
    Step, StepButton,
    StepLabel,
    Stepper,
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export const MainWrapper = styled.View`
  display: flex;
  flex-direction: column;
`;
export const PaginationWrapper = styled.View`
  //margin: 40px 80px;
  @media (min-width: 320px) {
    margin: 15px 40px;
    width: 50%;
  }
  @media (min-width: 400px) {
    margin: 20px 40px;
    width: 80%;
  }
  @media (min-width: 700px) {
    margin: 40px 80px;
  }
`

export const StyledStepper = styled(Stepper)`
  .MuiStepIcon-root {
    color: #151632;
  }
  .MuiStepIcon-text {
    font-size: 16px;
  }

  .MuiStepIcon-root.Mui-completed {
    color: #36d025;
  }

  .MuiStepIcon-root.Mui-active {
    color: #40a5d5;
  }

  .MuiStepLabel-label {
    color: #ebdcdc;
    @media (min-width: 320px) {
      font-size: 12px;
    }
    @media (min-width: 400px) {
      font-size: 16px;
    }
  }

  .MuiStepLabel-label.Mui-active {
    color: #ebdcdc;
  }

  .MuiStepLabel-label.Mui-completed {
    color: #ebdcdc;
  }
`;
export const MainHeader = styled.View `
display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 10px;
  color: white;
  text-align: center;
  font-family: Bryndan Write;
  font-size: 30px;
  font-style: normal;
  font-weight: 100;
  line-height: 80%; /* 94.15px */
  text-transform: uppercase;
  box-shadow: #555555;
  margin-top: 40px;
  & > span {
    margin: 5px;
  }
`
export const AuthorizationWrapper = styled.View`
  width: 100vw;
  height: 100%;
`;
export const LogoWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > img {
    width: 50px;
  }
  & > span {
    margin-left: 10px;
    color: #151632;
    text-align: center;
    //font-family: Bryndan Write;
    @media (min-width: 320px) {
      font-size: 20px;
    }
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    //line-height: 80%; /* 94.15px */
  }
`;
export const RegistrationCard = styled.View`
  display: grid;
  //grid-template-columns: 0.45fr 1fr;
  flex-direction: row;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 9%) 0px 9px 12px, rgb(0 0 0 / 6%) 0px 6px 6px;
  cursor: pointer;
  margin: 80px;
  max-width: 100%;
  overflow: hidden;
  @media (min-width: 320px) {
    margin: 20px 40px 60px 40px;
    grid-template-columns: 0fr 1fr;
  }
  @media (min-width: 768px) {
    margin: 20px 80px 80px 80px;
    grid-template-columns: 0.75fr 1fr;
  }
  @media (min-width: 1024px) {
    margin: 20px 120px 100px 120px;
  }
  @media (min-width: 1440px) {
    margin: 20px 160px 100px 120px;
  }
`;

export const RegistrationImageBlock = styled.View`
  @media (min-width: 320px) {
    & > img {
      display: none;
    }
  }
  @media (min-width: 660px) {
    & > img, View {
      width: 350px;
      display: block;
      margin-top: 50px;
    }
    }
    @media (min-width: 1024px) {
      & > img, View {
        width: 450px;
      }
  }
`;

export const RegistrationFormWrapper = styled.View`
  display: flex;
  flex-direction: column;
  overflow: visible;
  background-color: white;
`;
export const RegistrationLabel= styled.View`
  font-weight: bold;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const RegistrationForm = styled.TextInput`
  //flex-basis: 290px;
  display: flex;
  flex-direction: column;
  overflow: visible;
`;
// const RegisterButton = styled(Button)`
//   border-radius: 10px;
//   border: solid #151632 1px;
// ` ;
export const RegisterButton = styled(Button)`
  && {
    &.Mui-disabled {
      color: #fff4e8;
      cursor: not-allowed;
      background-color: #818181;
    }

    margin: 0 8px;
    background-color: #151632;
    color: white;
    //border-radius: 10px;
    padding: 5px 10px;

    &:hover {
      background-color: #40a5d5;
    }
  }
`;

export const StatusOverlay = styled.View`
  background: rgba(73, 71, 71, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  z-index: 10001;
`;

export const StatusContainer = styled.View`
  margin: 0 40px;
`;

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isMounted, setMounted] = useState(false);
    const [statusShown, setStatusShown] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState('unset');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [domain, setDomain] = useState('@gmail.com');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [activeStep, setActiveStep] = useState(0);

    // useEffect(() => {
    //     setMounted(true);
    // }, []);
    //
    // useEffect(() => {
    //     if (isMounted) {
    //         // Load animation
    //     }
    // }, [isMounted]);

    // const handleSubmit = async () => {
    //     setStatusShown(true);
    //     setLoadingStatus('loading');
    //
    //     try {
    //         const response = await axios.post(
    //             'api/account/register/',
    //             JSON.stringify({
    //                 email: email + domain,
    //                 password: password,
    //                 role: 'tutor',
    //                 first_name: firstName,
    //                 last_name: lastName,
    //             }),
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 withCredentials: true,
    //             }
    //         );
    //
    //         if (response.status === 201) {
    //             setLoadingStatus('success');
    //         } else {
    //             setLoadingStatus('error');
    //         }
    //     } catch (err) {
    //         setLoadingStatus('error');
    //     }
    // };
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        // event.preventDefault();
    };
    // const handleSubmit = async () => {
    //     setStatusShown(true);
    //     setLoadingStatus('loading');
    //     try {
    //         const response = await axios.post('api/account/register/',
    //             JSON.stringify({ email: email+domain, password: password, role: 'tutor',
    //                 first_name: firstName, last_name: lastName}),
    //             {
    //                 headers: { 'Content-Type': 'application/json'},
    //                 withCredentials: true
    //             }
    //         );
    //         console.log(response, 'resp');
    //         if (response.status === 201) {
    //             setLoadingStatus('success');
    //         }
    //         else setLoadingStatus('error');
    //     } catch (err) {
    //         setLoadingStatus('error');
    //         // if (!err?.response) {
    //         //     setErrMsg('No Server Response');
    //         // } else if (err.response?.status === 409) {
    //         //     setErrMsg('Username Taken');
    //         // } else {
    //         //     setErrMsg('Registration Failed')
    //         // }
    //         // errRef.current.focus();
    //     }
    // }
    const steps = ['Старт', 'Персональные данные', 'Финал'];
    const handleNext = () => {

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    const renderStatusContent = () => {
        const content = {
            unset: () => {
                return;
            },
            loading: () => {
                return <CircularProgress
                    sx={{height: '100px !important', width: '100px !important'}}
                    color='secondary'/>
            },
            success: () => {
                return <Alert
                    onClose={() => {
                        setStatusShown(false);
                    }}
                    severity="success">
                    <AlertTitle>Успешно</AlertTitle>
                    Вы  — <strong>успешно зарегистрированы!</strong>
                </Alert>
            },
            error: () => {
                return <Alert
                    onClose={() => {
                        setStatusShown(false);
                        setActiveStep(0);
                    }}
                    severity="error"
                >
                    <AlertTitle>Ошибка</AlertTitle>
                    Произошла ошибка во время регистрации
                    — <strong> Попробуйте еще раз!</strong>
                </Alert>
            },
        };

        return content[loadingStatus]();
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View>
                <AuthorizationWrapper>
                    <MainWrapper>
                        <PaginationWrapper>
                            <StyledStepper activeStep={activeStep}>
                                {steps.map((label, index) => {
                                    return (
                                        <Step color='secondary' key={label}>
                                            <StepLabel
                                            >{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </StyledStepper>
                        </PaginationWrapper>

                        <RegistrationCard>
                            <RegistrationImageBlock>
                            </RegistrationImageBlock>
                            <RegistrationFormWrapper className='card'>
                                <RegistrationLabel>
                                    {activeStep !== 2 &&
                                    <LogoWrapper>
                                        <span>Зарегистрироваться</span>
                                    </LogoWrapper>
                                    }
                                    {/*<label>Регистрация преподавателя</label>*/}
                                </RegistrationLabel>
                                <RegistrationForm>
                                    {activeStep === 0 &&
                                    <FormControl sx={{m: 1}} variant="outlined" color='secondary'>
                                        <InputLabel htmlFor="outlined-adornment-email"
                                                    sx={{paddingRight: '0'}}>Email</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-email"
                                            sx={{
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: 'black',
                                                    padding: '0',
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    paddingRight: '0',
                                                },
                                                "& .MuiInputAdornment-root": {
                                                    padding: '0',
                                                },
                                                paddingRight: '0 !important'
                                            }}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            inputProps={{style: {color: 'black'}}}
                                            label="Email"
                                            endAdornment={
                                                <InputAdornment position="end" sx={{padding: 0}}>
                                                    <Select
                                                        label="Domain"
                                                        value={domain}
                                                        onChange={(e) => setDomain(e.target.value)}
                                                        color='secondary'
                                                    >
                                                        <MenuItem value="@gmail.com">@gmail.com</MenuItem>
                                                        <MenuItem value="@mail.ru">@mail.ru</MenuItem>
                                                        <MenuItem value="@yandex.ru">@yandex.ru</MenuItem>
                                                    </Select>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    }
                                    {activeStep === 0 &&
                                    <FormControl sx={{m: 1}} variant="outlined" color='secondary'>
                                        <InputLabel htmlFor="outlined-adornment-password"
                                                    sx={{color: 'black'}}>Пароль</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            sx={{
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: 'black',
                                                },
                                            }}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            inputProps={{style: {color: 'black'}}}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Пароль"
                                        />
                                    </FormControl>
                                    }
                                    {activeStep === 1 &&
                                    <FormControl sx={{m: 1}} variant="outlined" color='secondary'>
                                        <InputLabel htmlFor="outlined-adornment-password" sx={{color: 'black'}}>Имя</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type="text"
                                            sx={{
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: 'black',
                                                },
                                            }}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            value={firstName}
                                            inputProps={{style: {color: 'black'}}}
                                            label="Имя"
                                        />
                                    </FormControl>
                                    }
                                    {activeStep === 1 &&
                                    <FormControl sx={{m: 1}} variant="outlined" color='secondary'>
                                        <InputLabel htmlFor="outlined-adornment-password"
                                                    sx={{color: 'black'}}>Фамилия</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type="text"
                                            sx={{
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: 'black',
                                                },
                                            }}
                                            onChange={(e) => setLastName(e.target.value)}
                                            value={lastName}
                                            inputProps={{style: {color: 'black'}}}
                                            label="Фамилия"
                                        />
                                    </FormControl>
                                    }
                                </RegistrationForm>
                                {activeStep!==2 &&
                                <View>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <RegisterButton
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                        >
                                            Назад
                                        </RegisterButton>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        {activeStep === 1
                                            ? <RegisterButton onClick={() => {handleNext();
                                                handleSubmit();}}>Зарегистрироваться</RegisterButton>
                                            : <RegisterButton onClick={handleNext}>Далее</RegisterButton>
                                        }
                                    </Box>
                                    <p>
                                        Уже зарегистрированы?<br/>
                                        <span className="line">
                                <a href="login">Войти</a>
                        </span>
                                    </p>
                                </View>
                                }
                                {activeStep === 2 &&
                                <Pagination count={5} variant="outlined" color="secondary" />
                                }
                            </RegistrationFormWrapper>
                        </RegistrationCard>
                    </MainWrapper>
                </AuthorizationWrapper>
            </View>
        </ScrollView>
    );
};

export default Register;
