import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxy from '../Auxy';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };
        requestInterceptors;
        responseInterceptors;

        componentWillMount() {
            this.requestInterceptors = axios.interceptors.request.use(request => {
                this.setState({ error: null });
                return request
            });
            this.responseInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptors);
            axios.interceptors.response.eject(this.responseInterceptors);
        }
        errorClicked = () => {
            this.setState({ error: null });
        }
        render() {
            return (
                <Auxy>
                    <Modal show={this.state.error} onModalClosed={this.errorClicked}>
                        Error: {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxy>
            );
        }
    }
};

export default withErrorHandler;