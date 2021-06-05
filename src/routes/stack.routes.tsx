import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { Welcome } from '../pages/Welcome';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { NewPill } from '../pages/NewPill';
import { PillHistory } from '../pages/PillHistory';
import { MyPills } from '../pages/MyPills';

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
        <stackRoutes.Screen
            name="NewPill"
            component={NewPill}
        />
        <stackRoutes.Screen
            name="MyPills"
            component={MyPills}
        />

    </stackRoutes.Navigator>
)

export default AppRoutes;