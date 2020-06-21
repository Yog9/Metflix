import React from 'react';
import Slider from "react-slick";
import noImage from "../images/no-image.png";

class Cast extends React.Component {
    render() {
        var settings = {
            dots: false,
            infinite: false,
            slidesToShow: 8,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1440,
                    settings: {
                        slidesToShow: 8,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 320,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }

                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        };
        return (
            <React.Fragment>
                <Slider {...settings}>
                    {
                        this.props.cast_array.map((cast_item, index) => (
                            <div className="cast_item" key={index}>

                                {cast_item.profile_path ? (
                                    <img className="cast_pic" src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${cast_item.profile_path}`} alt={`${cast_item.name}`} />
                                ) : <img className="cast_pic" src={noImage} alt={`${cast_item.name}`} />}

                                <p className="actor_name">{cast_item.name}</p>
                            </div>
                        ))
                    }


                </Slider>
            </React.Fragment>
        );
    }
}
export default Cast;