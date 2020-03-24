import React, {useState, useEffect} from 'react';
import Modal from 'react-awesome-modal';

const CustomModal = props => {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (props.visible) {setVisible(true)} 
        else {setVisible(false)}
    })

    const openModal = () => {
        setVisible(true)
    }

    const closeModal = () => {
        setVisible(false)
    }

        return (
            <section>
                <Modal 
                    visible={visible}
                    width="650"
                    height="520"
                    effect="fadeInUp"
                    onClickAway={() => closeModal()}
                >
                    {
                        props.children
                    }
                </Modal>
            </section>
        );
}

export {CustomModal};