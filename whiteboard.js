
                    <Form>
                    <TextField
                        value={name}
                        variant="standard"
                        style={{width: '100%'}}
                        placeholder="Give your space a name"
                        onChange={handleNameChange}
                        InputProps={titleInputProps}
                        inputProps={{maxLength: '20'}}
                        helperText={error.name ? error.name : name.length + '/20'}
                        FormHelperTextProps={{
                            style: {
                                textAlign: 'left', 
                                color: error.name ? '#F64747' : null
                            }
                        }}
                    />
                    <br></br>
                    <br></br>
                    <TextInput
                        rows={3}
                        multiline
                        value={desc}
                        variant="outlined"
                        placeholder="Give your space a description"
                        InputProps={iputPropsConfig}
                        inputProps={{maxLength: '140'}}
                        onChange={handleDescriptionChange}
                        helperText={error.desc ? error.desc : desc.length +'/140'}
                        FormHelperTextProps={{
                            style: {
                                textAlign: 'left', 
                                color: error.desc ? '#F64747' : null
                            }
                        }}
                    />
                </Form>

                <StyledFileInput
                    id="duplicate-file-selection"
                    label="Choose file"
                    accept="image/*,video/*"
                    onChange={() => setImage(true)}
                    className={null}
                    primary
                    iconBefore
                    allowDuplicates
                    icon={null}
                    image={image}
                />

                <SpaceTypeBox>
                    <SpaceType 
                        onClick={() => setSpaceType('public')}>
                        <Text
                            fontWeight={spaceType === 'public' ? '500' : null}>
                                Public
                        </Text>
                        {spaceType === 'public' ? <RiCheckLine size={22} /> : null }
                    </SpaceType>
                    <SpaceType
                        onClick={() => setSpaceType('members')}>
                        <Text
                            fontWeight={spaceType === 'members' ? '500' : null}>
                                Members
                        </Text>
                        {spaceType === 'members' ? <RiCheckLine size={22} /> : null }
                    </SpaceType>
                    <SpaceType
                        onClick={() => setSpaceType('private')}>
                        <Text
                            fontWeight={spaceType === 'private' ? '500' : null}>
                                Private
                        </Text>
                        {spaceType === 'private' ? <RiCheckLine size={22} /> : null }
                    </SpaceType>
                </SpaceTypeBox>

                <BottomRow>
                    <ButtonBox>

                    </ButtonBox>
                
                    <ButtonBox>

                    </ButtonBox>
                </BottomRow>


const StyledFileInput = styled(FileInput)`
    background: ${props => props.image ? primaryGreen : '#FFF' };
    height: 50px;
    padding-top: 1.5%;
    margin-top: 2%;
    margin-bottom:2%;
    color: ${primaryGray85};
    font-family: Montserrat;
    font-style: italic;
    border-width: 3px;
    border-style: solid;
    border-color: ${primaryGreen};
`


const SpaceTypeBox = styled(Row)`
    flex: 1;
    margin-top: 2%;
    margin-bottom: 2%;
`;

const SpaceType = styled(Row)`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2%;
    border-radius: 2px;
    background: ${props => props.color};
    &:hover{
        opacity: 0.7; 
    }
`;

const BottomRow = styled(Row)`
    height: 60px;
    justify-content: center;
    align-items: space-between;
`;

const ButtonBox = styled(Row)`
    flex: 1;
    margin: 0.2%;
    border-width: 2px;
    border-style: solid;
    border-color: #FFF;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);   
`;

const TextInput = styled(TextField)`
    width: 100%;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: lightgray;
`;

const Form = styled.form``;