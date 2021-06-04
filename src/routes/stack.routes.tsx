import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { Welcome } from '../pages/Welcome';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
   <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: 'white'
            },
        }} 
    >
        <stackRoutes.Screen
            name="Welcome"
            component={Welcome}
        />
        <stackRoutes.Screen
            name="Login"
            component={Login}
        />
        <stackRoutes.Screen
            name="Dashboard"
            component={Dashboard}
        />

    </stackRoutes.Navigator>
)

export default AppRoutes;