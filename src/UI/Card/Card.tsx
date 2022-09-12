import React, { useEffect, useState } from "react";
import { Icoupon } from "../../pages/MainPage/Main";
import styles from "../Card/Card.module.scss";
import defaultpreview from "../../assets/couponsImg/defoltIMG.png";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addFavorite,
  removeFromFavorite,
} from "../../store/slices/favoriteSlice/favoriteSlice";



type Props = {
  it: Icoupon;
};

const Card = ({ it }: Props) => {
  const dispatch = useAppDispatch();

  const favoriteItems = useAppSelector(
    (state) => state.favorite.favoriteCoupons
  );
  const isFavorite = favoriteItems.find((el: any) => el.id === it.id);

  const onAddFavoriteHandler = () => {
    if (isFavorite) {
      dispatch(removeFromFavorite(it));
    } else {
      dispatch(addFavorite(it));
    }

  };

  return (
    <div className={styles.contentBox}>
      <div onClick={onAddFavoriteHandler} className={styles.favoriteIcon}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.001 20.8125C11.9047 20.8126 11.8101 20.7879 11.7261 20.7408C10.0166 19.7395 8.41224 18.5688 6.93716 17.2463C3.70316 14.3357 2.06348 11.4351 2.06348 8.62503C2.06384 7.46198 2.437 6.32966 3.1282 5.39428C3.8194 4.4589 4.79224 3.76971 5.90392 3.42786C7.01561 3.08602 8.2076 3.10953 9.30494 3.49493C10.4023 3.88034 11.3472 4.60735 12.001 5.56925C12.6548 4.60735 13.5997 3.88034 14.697 3.49493C15.7944 3.10953 16.9863 3.08602 18.098 3.42786C19.2097 3.76971 20.1826 4.4589 20.8738 5.39428C21.565 6.32966 21.9381 7.46198 21.9385 8.62503C21.9385 11.4351 20.2988 14.3357 17.0647 17.2463C15.5896 18.5688 13.9852 19.7395 12.2758 20.7408C12.1918 20.7878 12.0972 20.8125 12.001 20.8125ZM7.50098 4.31253C6.35763 4.31382 5.26147 4.76859 4.453 5.57706C3.64453 6.38553 3.18977 7.48168 3.18848 8.62503C3.18848 13.9993 10.4809 18.6804 12.001 19.5973C13.521 18.6804 20.8135 13.9993 20.8135 8.62503C20.8133 7.62828 20.4679 6.66236 19.836 5.89149C19.2041 5.12062 18.3247 4.59239 17.3474 4.3966C16.3701 4.20081 15.3551 4.34955 14.475 4.81753C13.5949 5.2855 12.9041 6.04384 12.52 6.9636C12.4772 7.06597 12.4051 7.1534 12.3127 7.21489C12.2204 7.27639 12.1119 7.3092 12.001 7.3092C11.89 7.3092 11.7816 7.27639 11.6892 7.21489C11.5969 7.1534 11.5248 7.06597 11.482 6.9636C11.155 6.17751 10.6023 5.50605 9.89363 5.03416C9.18501 4.56226 8.35235 4.31113 7.50098 4.31253Z"
            fill="#4B5FA5"
          />
          <path
            d="M7.50098 4.31251C6.35763 4.3138 5.26147 4.76856 4.453 5.57703C3.64453 6.3855 3.18977 7.48166 3.18848 8.62501C3.18848 13.9992 10.4809 18.6804 12.001 19.5972C13.521 18.6804 20.8135 13.9992 20.8135 8.62501C20.8133 7.62825 20.4679 6.66233 19.836 5.89146C19.2041 5.12059 18.3247 4.59236 17.3474 4.39657C16.3701 4.20078 15.3551 4.34952 14.475 4.8175C13.5949 5.28548 12.9041 6.04381 12.52 6.96357C12.4772 7.06594 12.4051 7.15337 12.3127 7.21486C12.2204 7.27636 12.1119 7.30917 12.001 7.30917C11.89 7.30917 11.7816 7.27636 11.6892 7.21486C11.5969 7.15337 11.5248 7.06594 11.482 6.96357C11.155 6.17748 10.6023 5.50603 9.89364 5.03413C9.18501 4.56224 8.35235 4.31111 7.50098 4.31251Z"
            fill={isFavorite ? "red" : "white"}
          />
        </svg>
      </div>
      <div className={styles.couponLogoBox}>
        <img
          className={styles.couponLogoIMG}
          src={it.preview_image || defaultpreview}
          alt=""
        />
      </div>
      <div className={styles.companyInfo}>
        <img className={styles.companyLogo} src={it.company_logo} alt="" />
        <p className={styles.companyTitile}>{it.company_name}</p>
      </div>
      <div className={styles.cardInfoBox}>
        <div
          dangerouslySetInnerHTML={{ __html: it.conditions }}
          className={styles.description}
        ></div>
        <div className={styles.cardPriceBox}>
          <div className={styles.price}>
            <div className={styles.priceSVG}>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_7149_5883)">
                  <path
                    d="M16.8873 5.03513C14.7055 2.4264 12.5525 0.731083 12.4619 0.660211C11.971 0.276177 11.2497 0.625712 11.2497 1.25081V4.54873C11.2497 6.25187 8.99626 6.85138 8.15118 5.37089C7.89019 4.91369 7.25196 4.86194 6.91977 5.26735C4.64951 8.03756 2.625 11.5295 2.625 15.1253C2.625 20.2945 6.83048 24.5 11.9997 24.5C17.1689 24.5 21.3743 20.2945 21.3743 15.1253C21.3743 11.4359 19.2426 7.85119 16.8873 5.03513ZM11.9997 23C7.65751 23 4.12495 19.4675 4.12495 15.1253C4.12495 12.1001 5.85471 9.10777 7.51314 6.9344C9.47784 8.66946 12.7496 7.33615 12.7496 4.54873V2.88763C16.0754 5.9261 19.8744 10.6287 19.8744 15.1253C19.8744 19.4675 16.3418 23 11.9997 23Z"
                    fill="#4F70E2"
                  />
                  <path
                    d="M15.0854 11.1585C14.7585 10.9042 14.2874 10.9631 14.033 11.29L8.78315 18.0398C8.39747 18.5357 8.75882 19.2503 9.37464 19.2503C9.59813 19.2503 9.81928 19.1508 9.96717 18.9607L15.217 12.2109C15.4713 11.884 15.4124 11.4128 15.0854 11.1585Z"
                    fill="#4F70E2"
                  />
                  <path
                    d="M14.624 19.2501C15.4524 19.2501 16.1239 18.5786 16.1239 17.7502C16.1239 16.9218 15.4524 16.2502 14.624 16.2502C13.7956 16.2502 13.124 16.9218 13.124 17.7502C13.124 18.5786 13.7956 19.2501 14.624 19.2501Z"
                    fill="#4F70E2"
                  />
                  <path
                    d="M9.37495 14.0004C10.2033 14.0004 10.8749 13.3288 10.8749 12.5004C10.8749 11.672 10.2033 11.0005 9.37495 11.0005C8.54655 11.0005 7.875 11.672 7.875 12.5004C7.875 13.3288 8.54655 14.0004 9.37495 14.0004Z"
                    fill="#4F70E2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_7149_5883">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="priceContent">
              <p className={styles.priceContentText}>Цена скидки с купоном:</p>
              <div className={styles.priceContentPrice}>
                {it.price}{" "}
                <span className={styles.priceContentSpan}>{it.old_price}</span>
              </div>
            </div>
          </div>
          <div className={styles.price}>
            <div className={styles.priceSVG}>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_7149_5896)">
                  <path
                    d="M23.6938 18.993L2.88231 22.6312C2.80114 22.6454 2.71765 22.6268 2.65022 22.5794C2.58279 22.532 2.53694 22.4598 2.52275 22.3787L0.382605 10.1366C0.368415 10.0554 0.387051 9.97197 0.434413 9.90454C0.481774 9.83711 0.553983 9.79125 0.635153 9.77706L21.4466 6.13882C21.5278 6.12463 21.6113 6.14326 21.6787 6.19062C21.7461 6.23798 21.792 6.31019 21.8062 6.39136L23.9463 18.6334C23.9605 18.7146 23.9419 18.7981 23.8945 18.8655C23.8472 18.9329 23.775 18.9788 23.6938 18.993ZM3.08135 21.9656L23.2807 18.4344L21.2476 6.80442L1.04821 10.3357L3.08135 21.9656Z"
                    fill="#4F70E2"
                    stroke="#4F70E2"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M20.2143 17.6521L5.70026 20.1894C5.62006 20.2034 5.53758 20.185 5.47096 20.1382C5.40434 20.0914 5.35904 20.0201 5.34502 19.9399C5.30296 19.6993 5.16705 19.4853 4.96719 19.3449C4.76733 19.2045 4.51989 19.1493 4.27931 19.1914C4.19911 19.2054 4.11663 19.187 4.05001 19.1402C3.98339 19.0934 3.93809 19.022 3.92407 18.9419L2.86685 12.8943C2.85283 12.8141 2.87124 12.7317 2.91803 12.665C2.96482 12.5984 3.03616 12.5531 3.11636 12.5391C3.35695 12.497 3.57097 12.3611 3.71135 12.1613C3.85173 11.9614 3.90696 11.714 3.8649 11.4734C3.85089 11.3932 3.8693 11.3107 3.91609 11.2441C3.96288 11.1775 4.03422 11.1322 4.11442 11.1181L18.6285 8.5808C18.7087 8.56678 18.7912 8.58519 18.8578 8.63199C18.9244 8.67878 18.9697 8.75012 18.9837 8.83032C19.0258 9.0709 19.1617 9.28493 19.3615 9.42531C19.5614 9.56569 19.8088 9.62092 20.0494 9.57886C20.1296 9.56484 20.2121 9.58325 20.2787 9.63005C20.3453 9.67684 20.3906 9.74818 20.4047 9.82838L21.4619 15.8759C21.4759 15.9561 21.4575 16.0386 21.4107 16.1052C21.3639 16.1718 21.2926 16.2171 21.2124 16.2311C20.9718 16.2732 20.7578 16.4091 20.6174 16.609C20.477 16.8088 20.4218 17.0563 20.4638 17.2969C20.4778 17.377 20.4594 17.4595 20.4126 17.5261C20.3658 17.5928 20.2945 17.6381 20.2143 17.6521ZM5.86667 19.5371L19.8365 17.0949C19.8455 16.7942 19.9425 16.5026 20.1154 16.2564C20.2884 16.0102 20.5297 15.82 20.8096 15.7095L19.8475 10.2062C19.5467 10.1972 19.2552 10.1002 19.009 9.92724C18.7628 9.7543 18.5726 9.51298 18.4621 9.23313L4.49228 11.6753C4.48323 11.9761 4.38623 12.2676 4.21329 12.5138C4.04034 12.76 3.79902 12.9502 3.51917 13.0607L4.48125 18.564C4.78201 18.573 5.07352 18.67 5.31975 18.843C5.56597 19.0159 5.75612 19.2572 5.86667 19.5371Z"
                    fill="#4F70E2"
                    stroke="#4F70E2"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M17.4656 14.5141C17.263 14.5496 17.0544 14.5241 16.8663 14.441C16.6781 14.3579 16.5189 14.2208 16.4086 14.0472C16.2983 13.8736 16.2421 13.6712 16.2468 13.4655C16.2516 13.2599 16.3173 13.0603 16.4355 12.892C16.5537 12.7237 16.7192 12.5942 16.911 12.5199C17.1028 12.4457 17.3123 12.43 17.5131 12.4748C17.7138 12.5196 17.8968 12.6229 18.0388 12.7717C18.1808 12.9205 18.2755 13.108 18.3109 13.3106C18.3584 13.5823 18.296 13.8618 18.1375 14.0875C17.979 14.3132 17.7373 14.4667 17.4656 14.5141ZM17.197 12.9775C17.0957 12.9952 17.0019 13.0426 16.9275 13.1136C16.8531 13.1846 16.8014 13.2761 16.779 13.3765C16.7566 13.4768 16.7645 13.5816 16.8016 13.6775C16.8387 13.7734 16.9035 13.8561 16.9876 13.9152C17.0718 13.9743 17.1716 14.0072 17.2744 14.0096C17.3772 14.012 17.4784 13.9838 17.5652 13.9287C17.6521 13.8736 17.7206 13.7939 17.7621 13.6998C17.8037 13.6058 17.8164 13.5015 17.7987 13.4002C17.775 13.2643 17.6982 13.1435 17.5854 13.0642C17.4725 12.985 17.3328 12.9538 17.197 12.9775Z"
                    fill="#4F70E2"
                    stroke="#4F70E2"
                    strokeWidth="0.2"
                  />
                  <path
                    d="M7.22146 16.3047C7.01885 16.3401 6.81029 16.3146 6.62214 16.2315C6.434 16.1484 6.27473 16.0114 6.16447 15.8377C6.05421 15.6641 5.99791 15.4617 6.0027 15.2561C6.00749 15.0504 6.07314 14.8508 6.19137 14.6825C6.30959 14.5142 6.47507 14.3847 6.66687 14.3105C6.85868 14.2362 7.0682 14.2205 7.26895 14.2653C7.46969 14.3101 7.65264 14.4134 7.79465 14.5622C7.93667 14.711 8.03137 14.8986 8.06679 15.1012C8.11429 15.3729 8.05191 15.6523 7.89338 15.878C7.73485 16.1037 7.49315 16.2572 7.22146 16.3047ZM6.95283 14.7681C6.85152 14.7858 6.75775 14.8331 6.68335 14.9041C6.60896 14.9751 6.55729 15.0666 6.53489 15.167C6.51248 15.2673 6.52034 15.3721 6.55748 15.468C6.59461 15.5639 6.65935 15.6467 6.7435 15.7058C6.82766 15.7649 6.92746 15.7977 7.03027 15.8001C7.13308 15.8025 7.2343 15.7743 7.32112 15.7192C7.40793 15.6641 7.47645 15.5844 7.51801 15.4904C7.55956 15.3963 7.57229 15.292 7.55458 15.1907C7.53083 15.0549 7.45409 14.934 7.34124 14.8548C7.22839 14.7755 7.08868 14.7443 6.95283 14.7681Z"
                    fill="#4F70E2"
                    stroke="#4F70E2"
                    strokeWidth="0.2"
                  />
                  <path
                    d="M12.5679 16.6901C12.2283 16.7491 11.8792 16.6709 11.5972 16.4728C11.3152 16.2747 11.1232 15.9729 11.0635 15.6334L11.5757 15.5439C11.6113 15.7477 11.7264 15.9289 11.8957 16.0478C12.065 16.1667 12.2745 16.2135 12.4783 16.1779C12.6821 16.1423 12.8634 16.0272 12.9823 15.8579C13.1012 15.6886 13.1479 15.479 13.1123 15.2753C13.0696 15.0307 12.9196 14.7378 12.1338 14.6435C11.084 14.5171 10.7776 13.998 10.7053 13.5846C10.6459 13.245 10.7239 12.8957 10.9221 12.6136C11.1202 12.3314 11.4223 12.1396 11.762 12.0802C12.1016 12.0208 12.4509 12.0988 12.733 12.297C13.0151 12.4951 13.207 12.7973 13.2663 13.1369L12.7541 13.2264C12.7185 13.0227 12.6034 12.8414 12.4341 12.7225C12.2648 12.6036 12.0553 12.5568 11.8515 12.5924C11.6477 12.6281 11.4665 12.7432 11.3476 12.9124C11.2287 13.0817 11.1819 13.2913 11.2175 13.4951C11.2402 13.6249 11.3093 14.0203 12.196 14.1269C13.0388 14.2284 13.5194 14.5846 13.6245 15.1857C13.6835 15.5253 13.6053 15.8744 13.4072 16.1564C13.2091 16.4384 12.9073 16.6304 12.5679 16.6901Z"
                    fill="#4F70E2"
                    stroke="#4F70E2"
                    strokeWidth="0.2"
                  />
                  <path
                    d="M11.416 11.6125L11.9282 11.523L12.0625 12.2913L11.5503 12.3809L11.416 11.6125Z"
                    fill="#4F70E2"
                    stroke="#4F70E2"
                    strokeWidth="0.2"
                  />
                  <path
                    d="M12.2666 16.4785L12.7788 16.389L12.9131 17.1573L12.4009 17.2468L12.2666 16.4785Z"
                    fill="#4F70E2"
                    stroke="#4F70E2"
                    strokeWidth="0.2"
                  />
                  <g clipPath="url(#clip1_7149_5896)">
                    <path
                      d="M22.7546 14.2187L5.7608 20.9703C5.69452 20.9966 5.62049 20.9955 5.555 20.9673C5.48952 20.939 5.43793 20.8859 5.4116 20.8196L1.44011 10.8233C1.41377 10.757 1.41485 10.683 1.4431 10.6175C1.47134 10.552 1.52445 10.5004 1.59073 10.4741L18.5846 3.72254C18.6508 3.69621 18.7249 3.69728 18.7903 3.72553C18.8558 3.75378 18.9074 3.80688 18.9337 3.87316L22.9052 13.8695C22.9316 13.9358 22.9305 14.0098 22.9022 14.0753C22.874 14.1408 22.8209 14.1924 22.7546 14.2187ZM5.81213 20.3712L22.3061 13.8182L18.5332 4.32165L2.03921 10.8746L5.81213 20.3712Z"
                      fill="#4F70E2"
                      stroke="#4F70E2"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M19.6593 13.7122L7.66371 18.478C7.59743 18.5043 7.52341 18.5033 7.45792 18.475C7.39243 18.4468 7.34085 18.3937 7.31451 18.3274C7.23552 18.1285 7.08077 17.9692 6.8843 17.8845C6.68784 17.7998 6.46577 17.7965 6.26693 17.8755C6.20065 17.9019 6.12662 17.9008 6.06113 17.8725C5.99565 17.8443 5.94406 17.7912 5.91773 17.7249L3.93198 12.7267C3.90565 12.6604 3.90673 12.5864 3.93497 12.5209C3.96322 12.4554 4.01633 12.4039 4.08261 12.3775C4.28145 12.2985 4.44076 12.1438 4.5255 11.9473C4.61024 11.7509 4.61347 11.5288 4.53447 11.3299C4.50814 11.2637 4.50921 11.1896 4.53746 11.1241C4.56571 11.0587 4.61881 11.0071 4.68509 10.9807L16.6807 6.21495C16.747 6.18861 16.821 6.18969 16.8865 6.21794C16.952 6.24618 17.0036 6.29929 17.0299 6.36557C17.1089 6.56441 17.2637 6.72372 17.4601 6.80846C17.6566 6.8932 17.8787 6.89643 18.0775 6.81743C18.1438 6.7911 18.2178 6.79218 18.2833 6.82042C18.3488 6.84867 18.4004 6.90178 18.4267 6.96806L20.4125 11.9662C20.4388 12.0325 20.4377 12.1065 20.4095 12.172C20.3812 12.2375 20.3281 12.2891 20.2618 12.3154C20.063 12.3944 19.9037 12.5492 19.8189 12.7456C19.7342 12.9421 19.731 13.1642 19.81 13.363C19.8363 13.4293 19.8352 13.5033 19.807 13.5688C19.7787 13.6343 19.7256 13.6859 19.6593 13.7122ZM7.69005 17.8888L19.2359 13.3018C19.19 13.0422 19.2211 12.7749 19.3255 12.5328C19.4299 12.2908 19.603 12.0846 19.8233 11.9399L18.0163 7.39155C17.7567 7.43745 17.4894 7.40627 17.2473 7.30186C17.0053 7.19746 16.7991 7.02442 16.6544 6.80412L5.10859 11.3912C5.15448 11.6508 5.1233 11.9181 5.0189 12.1601C4.9145 12.4022 4.74146 12.6083 4.52116 12.7531L6.32819 17.3014C6.58776 17.2555 6.85509 17.2867 7.09713 17.3911C7.33917 17.4955 7.5453 17.6685 7.69005 17.8888Z"
                      fill="#4F70E2"
                    />
                    <path
                      d="M17.5683 11.36C17.3706 11.4386 17.1541 11.4568 16.946 11.4122C16.738 11.3677 16.5479 11.2625 16.3996 11.1099C16.2514 10.9573 16.1518 10.7641 16.1133 10.5549C16.0748 10.3457 16.0993 10.1297 16.1835 9.9344C16.2678 9.73906 16.4081 9.57308 16.5867 9.45747C16.7652 9.34186 16.9741 9.28181 17.1868 9.2849C17.3995 9.28799 17.6066 9.35409 17.7817 9.47484C17.9569 9.59559 18.0923 9.76556 18.1708 9.96327C18.2762 10.2284 18.2719 10.5245 18.1589 10.7864C18.0459 11.0484 17.8335 11.2547 17.5683 11.36ZM16.9726 9.8606C16.8738 9.89988 16.7888 9.96758 16.7284 10.0552C16.668 10.1427 16.635 10.2462 16.6334 10.3526C16.6319 10.459 16.6619 10.5634 16.7197 10.6527C16.7775 10.742 16.8605 10.8121 16.9582 10.8543C17.0559 10.8964 17.1638 10.9086 17.2684 10.8894C17.3731 10.8701 17.4696 10.8203 17.5459 10.7462C17.6222 10.6721 17.6748 10.577 17.6971 10.473C17.7194 10.369 17.7103 10.2607 17.671 10.1618C17.6183 10.0293 17.5152 9.92308 17.3842 9.86658C17.2532 9.81009 17.1052 9.80794 16.9726 9.8606Z"
                      fill="#4F70E2"
                    />
                    <path
                      d="M13.067 14.5953C12.7356 14.7265 12.3656 14.7209 12.0383 14.5798C11.711 14.4386 11.453 14.1733 11.321 13.8422L11.8208 13.6436C11.8998 13.8425 12.0546 14.0018 12.251 14.0865C12.4475 14.1713 12.6696 14.1745 12.8684 14.0955C13.0673 14.0165 13.2266 13.8618 13.3113 13.6653C13.396 13.4688 13.3993 13.2468 13.3203 13.0479C13.2255 12.8093 13.012 12.5442 12.1963 12.6142C11.1066 12.7075 10.687 12.2463 10.5267 11.8429C10.395 11.5115 10.4004 11.1414 10.5417 10.814C10.6829 10.4865 10.9484 10.2286 11.2798 10.0969C11.6112 9.96529 11.9813 9.97067 12.3088 10.1119C12.6362 10.2531 12.8941 10.5187 13.0258 10.8501L12.526 11.0486C12.447 10.8498 12.2922 10.6905 12.0958 10.6057C11.8993 10.521 11.6772 10.5178 11.4784 10.5968C11.2795 10.6758 11.1202 10.8305 11.0355 11.027C10.9508 11.2234 10.9475 11.4455 11.0265 11.6444C11.0769 11.7711 11.2302 12.1569 12.1505 12.078C13.0253 12.0033 13.5871 12.2628 13.8201 12.8493C13.9513 13.1808 13.9457 13.5507 13.8045 13.878C13.6633 14.2054 13.3981 14.4633 13.067 14.5953Z"
                      fill="#4F70E2"
                    />
                    <path
                      d="M10.8311 9.69641L11.3309 9.49783L11.6287 10.2476L11.1289 10.4461L10.8311 9.69641Z"
                      fill="#4F70E2"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_7149_5896">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                  <clipPath id="clip1_7149_5896">
                    <rect
                      width="21.0753"
                      height="3.83188"
                      fill="white"
                      transform="translate(0.306641 5.94458) rotate(-9.9162)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="priceContent">
              <p className={styles.priceContentText}>Цена за купон:</p>
              <div className={styles.priceContentPrice}>
                {it.price_for_coupon}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;

