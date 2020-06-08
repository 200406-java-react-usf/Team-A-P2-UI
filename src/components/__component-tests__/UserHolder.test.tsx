import * as React from 'react';
import { User } from '../../dtos/user';
import { authenticate } from '../../remote/auth-service';
import { Redirect } from 'react-router-dom';

import { shallow, mount, ReactWrapper } from 'enzyme';
import UserHolder, { IUserProps } from '../UserHolder/UserHolder';
import { BrowserRouter } from 'react-router-dom';


const props: IUserProps = {
    //@ts-ignore
    authUser: null as User,
    //@ts-ignore
    errorMessage: null as String,
    //@ts-ignore
    loginAction: null
}

describe('Login renders', () => {
    const wrapper: ReactWrapper = mount(<BrowserRouter><UserHolder {...props} /></BrowserRouter>);
    test('Renders the component', () => {
        expect(wrapper.exists()).toBeTruthy();
    });
});