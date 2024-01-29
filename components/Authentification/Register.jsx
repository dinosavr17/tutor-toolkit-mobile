import React, { useState } from 'react';
import {View, ScrollView, TouchableOpacity, Button, Text, ActivityIndicator} from 'react-native';
import { Portal } from 'react-native-paper';
import {IconButton, MD2Colors, Menu, TextInput, Banner, Card} from 'react-native-paper';
import axios from "axios";
import register from '../../assets/register.png';

const styles = {
    mainWrapper: {
        flex: 1,
        flexDirection: 'column',
    },
    paginationWrapper: {
        margin: 15,
        width: '50%',
    },
    mainHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 10,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Bryndan Write',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: '100',
        lineHeight: '80%',
        textTransform: 'uppercase',
        marginTop: 40,
    },
    authorizationWrapper: {
        flex: 1,
        height: '100%',
    },
    logoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    registrationCard: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        margin: '20px 40px 60px 40px',
    },
    registrationImageBlock: {
            image: {
                width: 350,
                marginTop: 50,
            },
    },
    registrationFormWrapper: {
        flex: 1,
        flexDirection: 'column',
        overflow: 'visible',
        backgroundColor: 'white',
    },
    registrationLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registrationForm: {
        flex: 1,
        flexDirection: 'column',
        overflow: 'visible',
    },
    registerButton: {
        margin: '0 8px',
        backgroundColor: '#151632',
        color: 'white',
        padding: '5px 10px',
    },
    statusOverlay: {
        background: 'rgba(73, 71, 71, 0.4)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(10px)',
        zIndex: 10001,
    },
    statusContainer: {
        margin: '0 40px',
    },
    registrationInput: {
        margin: '20px',
    }
};

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
    const [menuVisible, setMenuVisible] = useState(false);
    const [isOverlayVisible, setOverlayVisible] = useState(false);

    const toggleMenu = () => setMenuVisible(!menuVisible);

    const [activeStep, setActiveStep] = useState(0);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        // event.preventDefault();
    };
    const renderStatusContent = () => {
        const content = {
            unset: () => {
                return;
            },
            loading: () => {
                return <ActivityIndicator animating={true} color={MD2Colors.red800} />
            },
            success: () => {
                // return <Alert
                //     onClose={() => {
                //         setStatusShown(false);
                //     }}
                //     severity="success">
                //     <AlertTitle>Успешно</AlertTitle>
                //     Вы  — <strong>успешно зарегистрированы!</strong>
                // </Alert>
                return <Banner visible={loadingStatus === 'success'}/>

            },
            error: () => {
                // return <Alert
                //     onClose={() => {
                //         setStatusShown(false);
                //         setActiveStep(0);
                //     }}
                //     severity="error"
                // >
                //     <AlertTitle>Ошибка</AlertTitle>
                //     Произошла ошибка во время регистрации
                //     — <strong> Попробуйте еще раз!</strong>
                // </Alert>
                return <View></View>
            },
        };

        return content[loadingStatus]();
    };
    const handleSubmit = async () => {
        setStatusShown(true);
        setLoadingStatus('loading');
        try {
            const response = await axios.post('api/account/register/',
                JSON.stringify({ email: email+domain, password: password, role: 'tutor',
                    first_name: firstName, last_name: lastName}),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(response, 'resp');
            if (response.status === 201) {
                setLoadingStatus('success');
            }
            else setLoadingStatus('error');
        } catch (err) {
            setLoadingStatus('error');
            // if (!err?.response) {
            //     setErrMsg('No Server Response');
            // } else if (err.response?.status === 409) {
            //     setErrMsg('Username Taken');
            // } else {
            //     setErrMsg('Registration Failed')
            // }
            // errRef.current.focus();
        }
    }
    const steps = ['Старт', 'Персональные данные', 'Финал'];
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <ScrollView>
            <View>
                <View style={styles.authorizationWrapper}>
                    <View style={styles.mainWrapper}>
                        <View style={styles.paginationWrapper}>
                            {/* Pagination Component */}
                        </View>

                        <View>
                            <View>
                                {/* Registration Image */}
                            </View>

                            <View>
                                <View>
                                    {activeStep !== 2 && (
                                        <View>
                                            <Image source={register}/>
                                            <Text>Зарегистрироваться</Text>
                                        </View>
                                    )}
                                </View>

                                <Card>

                                    {activeStep === 0 &&
                                        <TextInput
                                            label="Email"
                                            value={email}
                                            onChangeText={(text) => setEmail(text)}
                                            style={styles.registrationInput}
                                            right={<TextInput.Affix text="/100" />}
                                            // right={
                                            //     <PaperTextInput.Icon
                                            //         name={() => (
                                            //             <Menu
                                            //                 visible={menuVisible}
                                            //                 onDismiss={toggleMenu}
                                            //                 anchor={
                                            //                     <IconButton
                                            //                         icon="dots-vertical"
                                            //                         onPress={toggleMenu}
                                            //                     />
                                            //                 }
                                            //             >
                                            //                 <Menu.Item
                                            //                     onPress={() => {
                                            //                         setDomain('@gmail.com');
                                            //                         toggleMenu();
                                            //                     }}
                                            //                     title="@gmail.com"
                                            //                 />
                                            //                 <Menu.Item
                                            //                     onPress={() => {
                                            //                         setDomain('@mail.ru');
                                            //                         toggleMenu();
                                            //                     }}
                                            //                     title="@mail.ru"
                                            //                 />
                                            //                 <Menu.Item
                                            //                     onPress={() => {
                                            //                         setDomain('@yandex.ru');
                                            //                         toggleMenu();
                                            //                     }}
                                            //                     title="@yandex.ru"
                                            //                 />
                                            //             </Menu>
                                            //         )}
                                            //     />
                                            // }
                                        />
                                    }
                                    {activeStep === 0 &&
                                        <View>
                                        <TextInput
                                            label="Пароль"
                                            value={password}
                                            style={styles.registrationInput}
                                            onChangeText={(text) => setPassword(text)}
                                            right={<TextInput.Affix text="/100" />}
                                        />
                                            <IconButton
                                                        icon={showPassword ? 'eye-off' : 'eye'}
                                                        color="black"
                                                        onPress={handleClickShowPassword}
                                                    />
                                        </View>
                                    }
                                    {activeStep === 1 &&
                                        <TextInput
                                            label="Имя"
                                            value={firstName}
                                            onChangeText={(text) => setFirstName(text)}
                                            style={styles.registrationInput}
                                        />
                                    }
                                    {activeStep === 1 &&
                                        <TextInput
                                            label="Фамилия"
                                            value={lastName}
                                            onChangeText={(text) => setLastName(text)}
                                        />
                                    }
                                    <Card.Actions>
                                        {activeStep !== 2 && (
                                            <View>
                                                <Button
                                                    onPress={handleBack}
                                                    title="Назад"
                                                    color="#841584"
                                                />

                                                {activeStep === 1 ? (
                                                    <Button
                                                        onPress={handleSubmit}
                                                        title="Зарегистрироваться"
                                                        buttonColor="#841584"
                                                    />
                                                ) : (
                                                    <Button
                                                        onPress={handleNext}
                                                        title="Далее"
                                                        buttonColor="#841584"
                                                    />
                                                )}
                                            </View>
                                        )}
                                    </Card.Actions>
                                </Card>

                                {activeStep === 2 && (
                                    <View>
                                        {/* Pagination Component */}
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <Portal.Host>
                {renderStatusContent()}
            </Portal.Host>
        </ScrollView>
    );
};

export default Register;
