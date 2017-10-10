import React, { Component } from 'react';
import { TextField, Grid, Paper, Button } from 'material-ui';
import styled from 'styled-components';
import api from '../../actions/Api';

/**
 * Styled Components
 */
const Container = styled.div`
  text-align: center;
  
  h1 {
    padding-top: 50px;
  }
  
  @media (min-width: 1024px){
    margin-top: 100px;
  }
`;

const ButtonGroup = styled.div`
  padding-top: 50px;
  padding-bottom: 20px;
`;

const CustomButton = styled.button`
  width: 90%;
  height: 40px;
  margin: 10px;
	font-size: 1em;
	border-radius: 3px;

	color: white;
	border: 2px solid ${props => props.bgColor};
	background-color: ${props => props.bgColor};
	
	&:hover {
		cursor: pointer;
		opacity: 0.5;
	}
`;

const PreviewImage = styled.img`
  max-width: 95%;
`;

/**
 * Material-ui override
 */
const textFieldStyle = {
  width: '80%',
  margin: '20px 0 0 0',
};

const hiddenInput = {
  display: 'none'
};

class Register extends Component {
  constructor(props) {
    super(props);

    this._auth();
    this.state = {
      image: '',
      image_preview_url: ''
    };
  }

  _auth() {
    if (localStorage.getItem('token')) {
      return this.props.history.push('/');
    }
  }

  handleImageChange(e) {
    let reader = new FileReader();
    let image = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: image,
        image_preview_url: reader.result
      });
    };

    reader.readAsDataURL(image)
  }

  register(e) {
    e.preventDefault();

    const register_data = {
      id: e.target.id.value,
      nickname: e.target.nickname.value,
      pw1: e.target.pw_1.value,
      pw2: e.target.pw_2.value
    };

    const files = {
      image: this.state.image,
    };

    api.postWithFile('/api/users/register', register_data, files, false)
      .then((data) => {
        this.props.history.push('/login');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  render() {
    let {image_preview_url} = this.state;
    let image_preview = null;

    if (image_preview_url) {
      image_preview = (<PreviewImage src={image_preview_url}/>);
    } else {
      image_preview = (<div className="previewText">프로필 이미지를 추가해주세요.</div>);
    }

    return (
      <Container>
        <Grid
          container
          align="center"
          direction="row"
          justify="center"
        >
          <Grid item xs={10} sm={4}>
            <Paper>
              <h1>VocaVocaNi</h1>
              <div>
                {image_preview}
              </div>
              <form onSubmit={this.register.bind(this)}>
                <input accept="jpg,jpeg,JPG,JPEG"
                       id="image"
                       type="file"
                       onChange={this.handleImageChange.bind(this)}
                       style={hiddenInput}
                />
                <div>
                  <label htmlFor="image">
                    <Button raised dense component="span">
                      프사 추가
                    </Button>
                  </label>
                </div>
                <TextField
                  required
                  id="id"
                  name="id"
                  label="ID"
                  style={textFieldStyle}
                /><br />
                <TextField
                  required
                  id="nickname"
                  name="nickname"
                  label="Nickname"
                  style={textFieldStyle}
                /><br />
                <TextField
                  required
                  id="pw_1"
                  name="pw_1"
                  type="password"
                  label="Password"
                  style={textFieldStyle}
                /><br />
                <TextField
                  required
                  id="pw_2"
                  name="pw_2"
                  type="password"
                  label="Password"
                  style={textFieldStyle}
                /><br />
                <ButtonGroup>
                  <CustomButton type="submit" bgColor={'RoyalBlue'}>회원가입</CustomButton>
                  <CustomButton type="button" bgColor={'grey'}
                    onClick={() => { this.props.history.push('/login'); }}>
                    로그인 화면
                  </CustomButton>
                </ButtonGroup>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Register;