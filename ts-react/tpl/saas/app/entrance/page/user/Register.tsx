import { withAuth, WithAuth } from 'common/auth';
import { Link } from 'common/Link';
import { S } from 'common/locale_error';
import { Location } from 'history';
import * as React from 'react';

const styles: { [key: string]: React.CSSProperties } = {
    form: {
        maxWidth: '380px',
        padding: '15px',
        margin: '0 auto',
    },
};

interface Props {
    next?: string;
    location: Location;
}

interface State {
    username?: string;
    email?: string;
    password?: string;
    password2?: string;
    errorText?: string;
}

const Input = (props: any) => {
    return <div className='form-group'>
        <input
            className='form-control'
            {...props} />
    </div>;
};

@withAuth
export class Register extends React.Component<Props & WithAuth, State> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            email: '',
            password: '',
            errorText: '',
        };
    }

    setError = (errMsg: string) => {
        this.setState({ errorText: errMsg });
    }

    error = () => {
        if (this.props.auth.status.state === 'error') {
            return S[this.props.auth.status.error_key] || this.props.auth.status.err;
        }
        return this.state.errorText;
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        if (!this.state.username.length) {
            this.setError('用户名不能为空');
            return;
        }
        if (!this.state.email.length) {
            this.setError('邮箱不能为空');
            return;
        }
        if (!this.state.password.length) {
            this.setError('密码不能为空');
            return;
        }
        if (this.state.password !== this.state.password2) {
            this.setError('密码不一致');
            return;
        }
        this.setError('');
        this.props.auth.register({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        });
    }

    makeHandleChange(key: string): (ev) => void {
        return (ev) => {
            this.setState({
                [key]: (key === 'password' || key === 'password2') ? ev.currentTarget.value : ev.currentTarget.value.trim(),
            });
        };
    }
    render() {
        const status = this.props.auth.status;
        if (status.state === 'user') {
            window.location.assign(this.props.location.query['next'] || '/');
        }

        const error = this.error();
        return <div className='container'>
            <form style={styles.form} onSubmit={this.handleSubmit}>
                <h2>请注册</h2>
                {error ? <div className='alert alert-danger'>{error}</div> : null}
                <Input
                    type='input'
                    placeholder='用户名'
                    required
                    autoFocus={true}
                    onChange={this.makeHandleChange('username')}
                />
                <Input
                    type='email'
                    placeholder='电子邮箱'
                    required
                    onChange={this.makeHandleChange('email')}
                />
                <Input
                    type='password'
                    placeholder='密码'
                    required
                    onChange={this.makeHandleChange('password')}
                />
                <Input
                    type='password'
                    placeholder='确认密码'
                    required
                    onChange={this.makeHandleChange('password2')}
                />
                <button className='btn btn btn-primary btn-block' type='submit'>注册</button>
                <div style={{ marginTop: 10 }}>
                    <Link to='/user/login'>现用户登陆</Link>
                </div>
            </form>
        </div>;
    }
}
