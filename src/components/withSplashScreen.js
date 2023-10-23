import React, { Component } from 'react';
import logo from '../logo.png';
import bg from './bg.png';

function SplashMessage() {
    const backgroundImageStyle = {
        backgroundImage: `url('${bg}')`, 
    };

    return (
        <div className="flex items-center justify-center min-h-screen" style={backgroundImageStyle}>
            <div className="text-center">
                <img src={logo} alt="logo" className="w-full h-64 mx-auto mb-4" />
                <h1 className="text-4xl font-semibold">Welcome Art Enthusiast...</h1>
            </div>
        </div>
    );
}


export default function withSplashScreen(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
            };
        }

        async componentDidMount() {
            try {
                // Perform async tasks here (e.g., API requests)
                // Replace the setTimeout with your actual async tasks
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating a 1-second delay
                this.setState({
                    loading: false,
                });
            } catch (err) {
                console.log(err);
                this.setState({
                    loading: false,
                });
            }
        }

        render() {
            // While checking user session, show "loading" message
            if (this.state.loading) return SplashMessage();

            // Otherwise, show the desired route
            return <WrappedComponent {...this.props} />;
        }
    };
}
