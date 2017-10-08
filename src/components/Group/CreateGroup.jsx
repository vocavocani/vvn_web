import React, {Component} from 'react';

import {TextField, Grid, Paper, Switch, Button, Chip} from 'material-ui';
import styled from 'styled-components';

import TopBar from '../TopBar/TopBar.jsx';
import api from '../../actions/Api';

/**
 * Styled Components
 */
const InnerContents = styled.div`
  text-align: center;
  
  padding-top: 50px;
  padding-left: 10%;
  padding-right: 10%;
  
  h1 {
    padding-top: 50px;
  }
`;

const LeftAlignContents = styled.div`
  text-align: left;
  padding-top: 20px;
  padding-left: 10%;
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

const TagsWrapper = styled.div`
  display: flex;
  justifyContent: center;
  flexWrap: wrap;
  margin-top: 10px;
  padding-left: 10%;
`;

/**
 * Material-ui override
 */
const textFieldStyle = {
  width: '80%',
  margin: '10px 0 0 0',
};

const hiddenInput = {
  display: 'none'
};

const tagItem = {
  marginRight: '10px'
};

class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      is_public: true,
      image: '',
      image_preview_url: ''
    };
  }

  handleChange() {
    this.setState({is_public: !this.state.is_public});
  };

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

  handleRequestDelete(data) {
    const tags = [...this.state.tags];
    const deleteTag = tags.indexOf(data);
    tags.splice(deleteTag, 1);
    this.setState({tags});
  };

  insertTag(e) {
    const char_code = e.charCode;

    if (char_code === 13 || char_code === 32) {
      e.preventDefault();

      const value = e.target.value;
      const tags = [...this.state.tags];
      if (tags.length >= 3) {
        alert('태그는 최대 3개 까지 입니다.');
        return;
      }
      if (value === '' || tags.indexOf(value) !== -1) {
        return;
      }

      tags.push(value);
      this.setState({tags});
      e.target.value = '';
    }
  }

  createGroup(e) {
    e.preventDefault();

    const group_data = {
      name: e.target.name.value,
      max_cap: e.target.max_cap.value,
      rule: e.target.rule.value,
      tag: this.state.tags,
      is_public: this.state.is_public,
      image: this.state.image
    };

    console.log('group_data:', group_data);

    api.post('/api/teams', group_data, true)
      .then((data) => {
        console.log(data);
        this.props.history.push('/');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  render() {
    let {image_preview_url} = this.state;
    let image_preview = null;
    if (image_preview_url) {
      image_preview = (<img src={image_preview_url}/>);
    } else {
      image_preview = (<div className="previewText">대표 사진을 업로드 해주세요.</div>);
    }

    return [
      <TopBar key="TopBar" history={this.props.history}/>,
      <InnerContents key="InnerContents">
        <Grid
          container
          align="center"
          direction="row"
          justify="center"
        >
          <Grid item sm={12} md={6}>
            <Paper>
              <h1>모임 만들기</h1>
              <div>
                {image_preview}
              </div>
              <form onSubmit={this.createGroup.bind(this)}>
                <input accept="jpg,jpeg,JPG,JPEG"
                       id="image"
                       type="file"
                       onChange={this.handleImageChange.bind(this)}
                       style={hiddenInput}
                />
                <div>
                  <label htmlFor="image">
                    <Button raised component="span">
                      모임 사진 추가
                    </Button>
                  </label>
                </div>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="모임 이름"
                  style={textFieldStyle}
                />
                <TextField
                  required
                  type="number"
                  id="max_cap"
                  name="max_cap"
                  label="최대 인원"
                  defaultValue="2"
                  helperText="최대 인윈 범위: 2 ~ 8"
                  style={textFieldStyle}
                />
                <TextField
                  id="tag_input"
                  name="tag_input"
                  label="태그 입력"
                  helperText="최대 3개 까지 가능"
                  onKeyPress={this.insertTag.bind(this)}
                  style={textFieldStyle}
                />
                <TagsWrapper>
                  {this.state.tags.map((tag, index) => {
                    return (
                      <Chip
                        label={tag}
                        key={index}
                        onRequestDelete={this.handleRequestDelete.bind(this, tag)}
                        style={tagItem}
                      />
                    );
                  })}
                </TagsWrapper>
                <TextField
                  multiline
                  id="rule"
                  name="rule"
                  label="모임 규칙 및 소개"
                  rows="3"
                  style={textFieldStyle}
                />
                <LeftAlignContents>
                  모임 공개 여부
                  <Switch
                    checked={this.state.is_public}
                    onChange={this.handleChange.bind(this)}
                  />
                </LeftAlignContents>
                <ButtonGroup>
                  <CustomButton type="submit" bgColor={'RoyalBlue'}>생성</CustomButton>
                </ButtonGroup>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </InnerContents>,
    ];
  }
}

export default CreateGroup;