import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';


const Upload = () => {


    const [pics, setPics] = useState([]);

    const onDrop = (picture) => {

        console.log(picture);

        setPics([...pics, URL.createObjectURL(picture[picture.length - 1])]);
    }


    return (

        <div >
            <div className="spacer"></div>
            <div className="row">

                <div className="col-2"></div>
                <div className="dash">
                    <div className="spacer1"></div>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Upload reciepts'
                        onChange={onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    />
                </div>
                <div className="dash">


                    {pics.length !== 0 &&
                        <div className="scroll">
                            {pics.map(x =>
                                <img className="receipt" src={x} alt=""></img>
                            )}
                        </div>
                    }
                </div>
                <div className="col-2"></div>

            </div>



        </div>

    );
}

export default Upload;