import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay  } from "swiper";
import "./Carousel.scss";
import "swiper/css/autoplay"
import {useEffect, useId} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getCarouselAsync} from "../../store/slices/carouselSlice/CarouselSlice";
const Carousel = () => {
  interface ICarousel{
        image:string,
        status : "idle" | "loading" | "failed"
    }
    const dispatch = useAppDispatch()
    useEffect(() => {
       dispatch(getCarouselAsync())
    }, [dispatch])

    const carousel = useAppSelector(s => s.carousel)
    const uniqId = useId();
    return (
        <Swiper
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay ]}
            className="mySwiper"
        >
            {carousel?.img?.map((element: ICarousel, index: number) => (
                <SwiperSlide key={`${uniqId}__carousel__${index}`}>
                    <img src={element.image} alt="" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Carousel;