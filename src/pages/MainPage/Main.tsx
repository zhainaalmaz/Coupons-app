import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCouponsAsync } from "../../store/slices/couponsSlice";
import { getCategoriesAsync } from "../../store/slices/CategoriesSlice/categoriesSlice";
import Card from "../../UI/Card/Card";
import styles from "./Main.module.scss";
import Categories from "../../components/Categories/categories";
import Carousel from "../../components/Carusel/Carousel";
import { getMainImgAsinc } from "../../store/slices/MainImgSlice/MainImgSlice";

export interface Icoupon {
  company_logo: string;
  company_name: string;
  conditions: string;
  description: string;
  discount_percent: number;
  id: number;
  is_active: boolean;
  old_price: string;
  order: number;
  preview_image: string;
  price: string;
  price_for_coupon: string;
  title: string;
}

export interface Icategories {
  icon: string;
  id: number;
  sub_subcategories: [];
  title: string;
}

interface ImainImg {
  image: string;
}

const Main = () => {
  const categoriesColors = [
    {
      color: '#0888FD',
      icon: (
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.2397 9.68004V17.8934C20.2397 18.5157 19.9924 19.1126 19.5524 19.5527C19.1123 19.9928 18.5154 20.24 17.893 20.24H9.67967C9.0573 20.24 8.46042 19.9928 8.02033 19.5527C7.58025 19.1126 7.33301 18.5157 7.33301 17.8934V9.68004C7.33301 9.05767 7.58025 8.46078 8.02033 8.0207C8.46042 7.58061 9.0573 7.33337 9.67967 7.33337H17.893C18.5154 7.33337 19.1123 7.58061 19.5524 8.0207C19.9924 8.46078 20.2397 9.05767 20.2397 9.68004ZM34.3197 7.33337H26.1063C25.484 7.33337 24.8871 7.58061 24.447 8.0207C24.0069 8.46078 23.7597 9.05767 23.7597 9.68004V17.8934C23.7597 18.5157 24.0069 19.1126 24.447 19.5527C24.8871 19.9928 25.484 20.24 26.1063 20.24H34.3197C34.9421 20.24 35.5389 19.9928 35.979 19.5527C36.4191 19.1126 36.6663 18.5157 36.6663 17.8934V9.68004C36.6663 9.05767 36.4191 8.46078 35.979 8.0207C35.5389 7.58061 34.9421 7.33337 34.3197 7.33337ZM17.893 23.76H9.67967C9.0573 23.76 8.46042 24.0073 8.02033 24.4474C7.58025 24.8874 7.33301 25.4843 7.33301 26.1067V34.32C7.33301 34.9424 7.58025 35.5393 8.02033 35.9794C8.46042 36.4195 9.0573 36.6667 9.67967 36.6667H17.893C18.5154 36.6667 19.1123 36.4195 19.5524 35.9794C19.9924 35.5393 20.2397 34.9424 20.2397 34.32V26.1067C20.2397 25.4843 19.9924 24.8874 19.5524 24.4474C19.1123 24.0073 18.5154 23.76 17.893 23.76ZM30.213 23.76C28.9367 23.76 27.689 24.1385 26.6277 24.8476C25.5665 25.5567 24.7393 26.5646 24.2509 27.7438C23.7625 28.923 23.6347 30.2205 23.8837 31.4724C24.1327 32.7242 24.7473 33.8741 25.6498 34.7766C26.5523 35.6791 27.7022 36.2937 28.954 36.5427C30.2059 36.7917 31.5034 36.6639 32.6826 36.1755C33.8618 35.687 34.8697 34.8599 35.5788 33.7987C36.2879 32.7374 36.6663 31.4897 36.6663 30.2134C36.6663 28.5018 35.9864 26.8604 34.7762 25.6502C33.566 24.4399 31.9245 23.76 30.213 23.76Z"
            fill="#0888FD"
          />
        </svg>
      ),
    },
    {
      color: '#FD9B08',
      icon: (
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.16699 16.8664V32.6942C9.16699 33.8753 10.1248 34.8331 11.3059 34.8331H16.0114V33.122H11.7337C11.261 33.122 10.8781 32.7391 10.8781 32.2664H16.0114V31.4109H10.8781V30.9831H16.0114V30.1275H10.8781V29.6998H16.0114V28.8442H10.8781V28.4164H16.0114V27.5609H10.8781V27.1331H16.0114V26.2775H10.8781V25.8498H16.0114V24.9942H10.8781V24.5664H16.0114V23.7109H10.8781V23.2831H16.0114V22.4275H10.8781V21.9998H16.0114V21.1442H10.8781V20.7164H16.0114V19.8609H10.8781V19.4331H16.0114V18.5775H10.8781V18.1498H16.0114V17.2942H10.8781C10.8781 16.8215 11.261 16.4387 11.7337 16.4387H16.0114V14.7275H11.3059C10.1248 14.7275 9.16699 15.6853 9.16699 16.8664Z"
            fill="#FD9B08"
          />
          <path
            d="M31.4115 27.9888C31.1977 27.9888 30.9893 28.0111 30.7866 28.0483L28.3576 23.2914L31.4115 9.16663L26.2782 19.2194L21.1449 9.16663L24.1988 23.2914L21.7699 28.0483C21.5671 28.0111 21.3588 27.9888 21.1449 27.9888C19.255 27.9888 17.7227 29.5212 17.7227 31.4111C17.7227 33.301 19.255 34.8333 21.1449 34.8333C23.0348 34.8333 24.5671 33.301 24.5671 31.4111C24.5671 30.4191 24.1423 29.5284 23.4681 28.9034L24.8203 26.1995C25.1296 25.5813 25.6652 25.151 26.2782 24.9486C26.8916 25.151 27.4272 25.5813 27.7361 26.1995L29.0883 28.9034C28.4141 29.5284 27.9893 30.4191 27.9893 31.4111C27.9893 33.301 29.5216 34.8333 31.4115 34.8333C33.3015 34.8333 34.8338 33.301 34.8338 31.4111C34.8338 29.5212 33.3015 27.9888 31.4115 27.9888ZM21.1449 33.55C19.9638 33.55 19.006 32.5922 19.006 31.4111C19.006 30.23 19.9638 29.2722 21.1449 29.2722C22.326 29.2722 23.2838 30.23 23.2838 31.4111C23.2838 32.5922 22.326 33.55 21.1449 33.55ZM26.706 22.8555V23.7111H25.8504V22.8555H26.706ZM31.4115 33.55C30.2305 33.55 29.2727 32.5922 29.2727 31.4111C29.2727 30.23 30.2305 29.2722 31.4115 29.2722C32.5926 29.2722 33.5504 30.23 33.5504 31.4111C33.5504 32.5922 32.5926 33.55 31.4115 33.55Z"
            fill="#FD9B08"
          />
        </svg>
      ),
    },
    {
      color: '#26AD5C',
      icon: (
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.0628 35.6715C17.658 36.194 18.2723 36.7331 18.9042 37.2921C18.9085 37.2959 18.9129 37.2998 18.9173 37.3036L21.0196 39.1194C21.3012 39.3628 21.6508 39.4844 22.0004 39.4844C22.35 39.4844 22.6996 39.3627 22.9813 39.1194L25.0831 37.3036C25.0875 37.2998 25.0918 37.296 25.0961 37.2922C29.2577 33.6118 32.3779 30.7942 34.6353 28.0462C37.2718 24.8367 38.4999 21.9348 38.4999 18.9138C38.4999 13.448 34.2185 9.16663 28.7529 9.16663C26.2964 9.16663 23.8692 10.0916 22.0004 11.6951C20.1311 10.0915 17.7039 9.16663 15.2473 9.16663C9.7815 9.16653 5.5 13.448 5.5 18.9137C5.5 25.5206 10.1 29.5588 17.0628 35.6715ZM15.9986 21.325H19.9994V17.324H24.0003V21.325H28.0012V25.3258H24.0003V29.3266H19.9994V25.3258H15.9986V21.325Z"
            fill="#26AD5C"
          />
        </svg>
      ),
    },
    {
      color: '#E31B4B',
      icon: (
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.6736 7.54164C19.4743 7.54927 19.2852 7.63155 19.1437 7.77214C18.9962 7.92083 18.9134 8.12173 18.9132 8.33116V12.7477C18.9172 13.0533 18.806 13.3491 18.6018 13.5764C18.3976 13.8037 18.1153 13.9458 17.811 13.9744C17.6479 13.9864 17.4839 13.9646 17.3296 13.9104C17.1752 13.8562 17.0336 13.7708 16.9138 13.6594C16.7939 13.548 16.6983 13.413 16.633 13.263C16.5676 13.113 16.534 12.9511 16.534 12.7875V8.39475C16.5345 8.27645 16.5113 8.15926 16.4658 8.05007C16.4203 7.94087 16.3534 7.84187 16.2691 7.75889C16.1965 7.68753 16.1103 7.63151 16.0157 7.59418C15.921 7.55686 15.8198 7.53899 15.718 7.54164C15.5187 7.54927 15.3296 7.63155 15.1881 7.77214C15.0407 7.92083 14.9578 8.12173 14.9576 8.33116V12.7875C14.9576 13.1037 14.832 13.4069 14.6084 13.6305C14.3849 13.8541 14.0816 13.9797 13.7654 13.9797C13.4492 13.9797 13.146 13.8541 12.9224 13.6305C12.6988 13.4069 12.5732 13.1037 12.5732 12.7875V8.39475C12.5731 8.27692 12.5497 8.16028 12.5042 8.05158C12.4587 7.94288 12.3921 7.8443 12.3082 7.76154C12.2389 7.69154 12.1564 7.63605 12.0654 7.59829C11.9744 7.56054 11.8769 7.54128 11.7784 7.54164H11.7572C11.5575 7.54769 11.3678 7.63021 11.2273 7.77214C11.0788 7.9204 10.995 8.12135 10.9941 8.33116V14.3877C10.9941 16.2131 12.4937 17.7127 13.776 18.4413C14.0836 18.6148 14.3353 18.8725 14.5014 19.1841C14.6676 19.4958 14.7413 19.8484 14.7139 20.2005L13.6144 34.086C13.6012 34.4019 13.6513 34.7173 13.7619 35.0135C13.8724 35.3097 14.0412 35.5808 14.2582 35.8107C14.4474 36.0148 14.6768 36.1776 14.9318 36.289C15.1869 36.4003 15.4622 36.4578 15.7405 36.4578C16.0189 36.4578 16.2942 36.4003 16.5492 36.289C16.8043 36.1776 17.0337 36.0148 17.2229 35.8107C17.4414 35.5781 17.611 35.3039 17.7216 35.0044C17.8322 34.7049 17.8815 34.3863 17.8667 34.0674L16.7725 20.2747C16.7415 19.8868 16.8333 19.4989 17.0349 19.1661C17.2365 18.8333 17.5377 18.5723 17.8958 18.4201C18.324 18.2559 18.7251 18.0282 19.0854 17.7445C19.5275 17.3046 19.878 16.7814 20.1167 16.2053C20.3555 15.6291 20.4777 15.0114 20.4763 14.3877V8.3974C20.4763 8.27957 20.4528 8.16293 20.4074 8.05423C20.3619 7.94553 20.2953 7.84695 20.2114 7.76419C20.1409 7.69336 20.0571 7.63721 19.9648 7.59901C19.8725 7.56081 19.7735 7.54131 19.6736 7.54164Z"
            fill="#E31B4B"
          />
          <path
            d="M28.2604 7.33264C27.0019 7.33334 25.7951 7.83341 24.905 8.72306C24.0148 9.6127 23.5141 10.8192 23.5127 12.0777V14.5946C23.5127 16.4174 25.007 17.9143 26.284 18.6429C26.5929 18.817 26.8454 19.076 27.0116 19.3892C27.1778 19.7024 27.2508 20.0567 27.2218 20.4101L26.1329 34.2506C26.119 34.5751 26.1702 34.8991 26.2835 35.2035C26.3968 35.5079 26.5699 35.7866 26.7926 36.023C26.9793 36.2259 27.2059 36.3879 27.4583 36.4987C27.7108 36.6094 27.9834 36.6666 28.2591 36.6666C28.5347 36.6666 28.8074 36.6094 29.0598 36.4987C29.3122 36.3879 29.5389 36.2259 29.7255 36.023C29.95 35.7835 30.1241 35.5013 30.2374 35.1931C30.3507 34.885 30.401 34.5573 30.3852 34.2294L29.2963 20.4101C29.2689 20.058 29.3426 19.7054 29.5088 19.3937C29.6749 19.0821 29.9266 18.8244 30.2342 18.6509C31.5112 17.9223 33.0055 16.4254 33.0055 14.6026V12.0857C33.0065 11.4619 32.8846 10.844 32.6466 10.2674C32.4086 9.69075 32.0592 9.16671 31.6185 8.72525C31.1778 8.28379 30.6543 7.93356 30.0781 7.6946C29.5019 7.45564 28.8842 7.33264 28.2604 7.33264ZM30.886 12.6076C30.7454 12.6076 30.6107 12.5518 30.5113 12.4524C30.4119 12.353 30.3561 12.2183 30.3561 12.0777C30.3554 11.5221 30.1344 10.9895 29.7415 10.5966C29.3486 10.2038 28.816 9.98274 28.2604 9.98204C28.1199 9.98204 27.9851 9.92622 27.8857 9.82684C27.7864 9.72747 27.7305 9.59269 27.7305 9.45216C27.7305 9.31163 27.7864 9.17685 27.8857 9.07748C27.9851 8.97811 28.1199 8.92228 28.2604 8.92228C29.0969 8.92368 29.8986 9.25658 30.4901 9.84804C31.0815 10.4395 31.4144 11.2413 31.4158 12.0777C31.4158 12.2183 31.36 12.353 31.2606 12.4524C31.1613 12.5518 31.0265 12.6076 30.886 12.6076Z"
            fill="#E31B4B"
          />
        </svg>
      ),
    },
    {
      color: '#FF9162',
      icon: (
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.1301 21.1034C18.002 21.2745 17.8701 21.8163 17.2709 21.9303L16.8936 22.0021L17.1732 22.3196C17.5577 22.7564 17.3627 23.2385 17.3657 23.4557C17.5931 23.3883 17.9875 23.0695 18.5089 23.2915L18.8944 23.4557C18.8975 23.2405 18.7032 22.7555 19.087 22.3196L19.3666 22.0021L18.9893 21.9303C18.3893 21.8161 18.2576 21.2737 18.1301 21.1034Z"
            fill="#FF9162"
          />
          <path
            d="M37.5332 13.2957C36.6447 13.2957 35.9219 12.5728 35.9219 11.6843C35.9219 11.1504 35.489 10.7175 34.9551 10.7175H30.7044V14.2657C30.7044 14.7996 30.2715 15.2325 29.7376 15.2325C29.2037 15.2325 28.7708 14.7996 28.7708 14.2657V10.7175H9.04492C8.51099 10.7175 8.07812 11.1504 8.07812 11.6843C8.07812 12.5728 7.35528 13.2957 6.4668 13.2957C5.93287 13.2957 5.5 13.7285 5.5 14.2625V29.7376C5.5 30.2716 5.93287 30.7044 6.4668 30.7044C7.35528 30.7044 8.07812 31.4273 8.07812 32.3158C8.07812 32.8497 8.51099 33.2826 9.04492 33.2826H28.7708V29.7344C28.7708 29.2005 29.2037 28.7676 29.7376 28.7676C30.2715 28.7676 30.7044 29.2005 30.7044 29.7344V33.2826H34.9551C35.489 33.2826 35.9219 32.8497 35.9219 32.3158C35.9219 31.4273 36.6447 30.7044 37.5332 30.7044C38.0671 30.7044 38.5 30.2716 38.5 29.7376V14.2625C38.5 13.7285 38.0671 13.2957 37.5332 13.2957ZM13.2956 14.5879H22.9636C23.4975 14.5879 23.9304 15.0208 23.9304 15.5547C23.9304 16.0887 23.4975 16.5215 22.9636 16.5215H13.2956C12.7617 16.5215 12.3288 16.0887 12.3288 15.5547C12.3288 15.0208 12.7617 14.5879 13.2956 14.5879ZM20.9956 24.8875C21.0757 25.6214 20.3347 26.1713 19.6556 25.882L18.1296 25.2321L16.6035 25.882C15.9244 26.1713 15.1834 25.6212 15.2636 24.8875L15.4396 23.2776L14.3218 22.0082C13.8279 21.4472 14.1319 20.5593 14.8668 20.4195L16.4672 20.1151L17.2867 18.6564C17.6548 18.0014 18.6023 17.9976 18.9724 18.6564L19.792 20.1151L21.3923 20.4195C22.1267 20.5592 22.4315 21.4468 21.9373 22.0081L20.8195 23.2776L20.9956 24.8875ZM22.97 29.4122H13.3021C12.7681 29.4122 12.3353 28.9793 12.3353 28.4454C12.3353 27.9114 12.7681 27.4786 13.3021 27.4786H22.97C23.5039 27.4786 23.9368 27.9114 23.9368 28.4454C23.9368 28.9793 23.5039 29.4122 22.97 29.4122ZM30.7044 25.8737C30.7044 26.4076 30.2715 26.8405 29.7376 26.8405C29.2037 26.8405 28.7708 26.4076 28.7708 25.8737V23.9401C28.7708 23.4062 29.2037 22.9733 29.7376 22.9733C30.2715 22.9733 30.7044 23.4062 30.7044 23.9401V25.8737ZM30.7044 20.0697C30.7044 20.6036 30.2715 21.0365 29.7376 21.0365C29.2037 21.0365 28.7708 20.6036 28.7708 20.0697V18.1361C28.7708 17.6022 29.2037 17.1693 29.7376 17.1693C30.2715 17.1693 30.7044 17.6022 30.7044 18.1361V20.0697Z"
            fill="#FF9162"
          />
        </svg>
      ),
    },
    {
      color: '#1AB5BF',
      icon: (
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.0008 28.1621L10.8867 22.7406V29.8972L22.0014 34.8332L33.1159 29.8972V22.74L22.0008 28.1621Z"
            fill="#1AB5BF"
          />
          <path
            d="M39.1724 17.5437L21.9998 9.16663L4.82715 17.5437L21.9998 25.9207L35.1299 19.5157V26.9719H37.1445V18.5329L39.1724 17.5437Z"
            fill="#1AB5BF"
          />
        </svg>
      ),
    },
    {
      color: '#6A52FF',
      icon: (
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36.723 18.0237C36.7003 17.9976 36.6811 17.9723 36.6544 17.9469L35.4766 16.8103C36.4534 16.5887 37.505 15.7703 37.505 14.9307C37.505 13.9526 36.1474 13.6055 34.9888 13.6055C33.7774 13.6055 33.6368 14.4355 33.6224 15.022L30.5836 12.0923C29.9662 11.4811 28.7953 11.0002 27.92 11.0002H22.0015H22.0001H16.0802C15.2056 11.0002 14.0353 11.4811 13.4173 12.0923L10.3792 15.022C10.3634 14.4355 10.2228 13.6055 9.01271 13.6055C7.85274 13.6055 6.4959 13.9526 6.4959 14.9307C6.4959 15.7703 7.54817 16.5887 8.52499 16.8103L7.34719 17.9469C7.32043 17.9723 7.30191 17.9976 7.27859 18.0237C6.01847 19.1006 5.19531 21.0981 5.19531 22.5475V26.8546C5.19531 27.9 5.60758 28.8487 6.27365 29.5559V31.2262C6.27365 32.203 7.09132 32.9994 8.09695 32.9994H10.3016C11.3073 32.9994 12.1242 32.2044 12.1242 31.2262V30.7989H22.0001H22.0015H31.8766V31.2262C31.8766 32.2044 32.6929 32.9994 33.6999 32.9994H35.9039C36.9102 32.9994 37.7265 32.203 37.7265 31.2262V29.5559C38.3933 28.8487 38.8049 27.9 38.8049 26.8546V22.5475C38.8062 21.0981 37.9831 19.1006 36.723 18.0237ZM14.5334 13.3942C14.9607 13.0382 15.7077 12.7679 16.0802 12.7679H22.0001H22.0015H27.9213C28.2938 12.7679 29.0408 13.0382 29.4682 13.3942L33.453 17.2561H22.0015H22.0001H10.5493L14.5334 13.3942ZM6.56244 21.8959C6.56244 20.8354 7.39246 19.9745 8.41729 19.9745C9.44144 19.9745 12.7883 21.9391 12.7883 22.9996C12.7883 24.0601 9.44144 23.8145 8.41729 23.8145C7.39246 23.8145 6.56244 22.9571 6.56244 21.8959ZM12.1249 28.9104H11.7717H11.4184L9.32277 28.9139C8.74107 28.7328 8.33086 28.5215 8.0407 28.2944C7.8939 28.1799 7.7814 28.0605 7.6936 27.9419C7.60511 27.8218 7.54063 27.7038 7.49878 27.5859C7.23812 26.8491 7.7766 26.1721 7.7766 26.1721H11.3532L13.7376 28.9091L12.1249 28.9104ZM27.1435 28.9118H22.0015H22.0001H16.8581C15.7859 28.9118 14.9154 28.0413 14.9154 26.9699H22.0001H22.0015H29.0861C29.0861 28.0427 28.2156 28.9118 27.1435 28.9118ZM27.5948 25.6446H22.0015H22.0001H16.4067C15.2406 25.6446 14.294 24.2069 14.294 22.4337H22.0001H22.0015H29.7076C29.7076 24.2075 28.761 25.6446 27.5948 25.6446ZM36.5035 27.5872C36.4609 27.7052 36.3964 27.8232 36.308 27.9426C36.2208 28.0612 36.1083 28.1806 35.9609 28.2951C35.6714 28.5222 35.2605 28.7348 34.6788 28.9145L32.5832 28.9111H32.2299H31.8766H30.2625L32.6483 26.1742H36.2243C36.2243 26.1735 36.7634 26.8491 36.5035 27.5872ZM35.5843 23.8145C34.5608 23.8145 31.214 24.0587 31.214 22.9996C31.214 21.9405 34.5608 19.9745 35.5843 19.9745C36.6091 19.9745 37.4391 20.8354 37.4391 21.8959C37.4391 22.9557 36.6091 23.8145 35.5843 23.8145Z"
            fill="#6A52FF"
          />
        </svg>
      ),
    },
    {
      color: '#FC69FF',
      icon: (
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.8845 32.273C11.8014 20.1901 23.8149 32.2033 11.7314 20.12C11.3956 19.7841 10.8519 19.7841 10.5161 20.12L9.30082 21.3353C8.29556 22.3406 8.29556 23.976 9.30082 24.9812L9.90851 25.5888L9.30082 26.1965C8.29562 27.2018 8.29562 28.8372 9.30088 29.8425L14.1621 34.7037C15.1673 35.7089 16.8028 35.7089 17.808 34.7037L18.4156 34.096L19.0233 34.7037C20.0286 35.7089 21.664 35.7089 22.6692 34.7037L23.8845 33.4884C24.2204 33.1525 24.2204 32.6089 23.8845 32.273Z"
            fill="#FC69FF"
          />
          <path
            d="M34.694 19.0251L34.0863 18.4174L34.694 17.8097C35.6993 16.8045 35.6993 15.169 34.694 14.1639L29.8328 9.30265C28.8275 8.29739 27.1921 8.29739 26.1869 9.30265L25.5792 9.91029L24.9715 9.30265C23.9663 8.29739 22.3309 8.29739 21.3256 9.30265L20.1103 10.5179C19.7744 10.8538 19.7744 11.3975 20.1103 11.7332L32.2635 23.8863C32.5993 24.2221 33.1429 24.2221 33.4787 23.8863L34.694 22.6709C35.6993 21.6657 35.6993 20.0303 34.694 19.0251Z"
            fill="#FC69FF"
          />
          <path
            d="M35.9107 8.08737C34.9056 7.08205 33.2701 7.08205 32.2649 8.08731L31.6572 8.69495L35.3032 12.3409L35.9107 11.7332C36.916 10.728 36.916 9.09251 35.9107 8.08737Z"
            fill="#FC69FF"
          />
          <path
            d="M8.69356 31.6654L8.08598 32.273C7.08072 33.2782 7.08072 34.9137 8.08598 35.9189C9.09112 36.9242 10.7267 36.9242 11.7318 35.9189L12.3395 35.3112L8.69356 31.6654Z"
            fill="#FC69FF"
          />
          <path
            d="M23.1493 17.2023L17.2002 23.1579L20.8461 26.8038L26.7952 20.8483L23.1493 17.2023Z"
            fill="#FC69FF"
          />
        </svg>
      ),
    },
    {
      color: '#CE2BBE',
      icon: (
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.2144 11.7994V26.4901C16.3596 25.7276 15.2331 25.2633 14.0001 25.2633C11.3346 25.2633 9.16602 27.4319 9.16602 30.0974C9.16602 32.763 11.3346 34.9315 14.0001 34.9315C16.6623 34.9315 18.8286 32.7684 18.8341 30.1075H18.8342V18.3011L33.2131 14.6562V22.5904C32.3583 21.8278 31.2318 21.3635 29.9988 21.3635C27.3333 21.3635 25.1647 23.5321 25.1647 26.1976C25.1647 28.8631 27.3333 31.0317 29.9988 31.0317C32.6643 31.0317 34.8329 28.8631 34.8329 26.1976V7.33325L17.2144 11.7994Z"
            fill="#CE2BBE"
          />
        </svg>
      ),
    },
    {
      color: '#FF3998',
      icon: (
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.539 16.0898C12.9772 16.2412 13.246 16.6821 13.1803 17.141L11.2673 30.4686C12.7143 31.0358 14.1445 31.4908 15.5644 31.8344C15.5644 27.0246 19.2702 23.9118 23.2775 23.9118C25.3419 23.9118 27.2826 24.7117 28.7431 26.1638C30.0908 27.5051 30.8804 29.253 30.9945 31.1286C32.3673 30.6729 33.7505 30.1128 35.1491 29.4483L33.5339 18.3276C33.4591 17.8158 33.0093 17.4297 32.4866 17.4297H23.0764C22.5337 17.4297 22.1016 16.983 22.1096 16.4481C22.2218 9.02847 19.9923 6.80309 17.145 5.542C16.8154 5.39595 16.4479 5.65222 16.4689 6.01219L16.5757 7.84614C16.6156 8.30762 16.4087 8.75944 16.0297 9.03208C15.8709 9.14635 16.2737 8.98573 9.62631 11.3498C8.49548 11.7529 8.02813 13.084 8.65049 14.0498C9.3705 15.1614 10.2991 15.3174 12.539 16.0898Z"
            fill="#FF3998"
          />
          <path
            d="M5.5 30.8454V34.0153C5.5 34.239 5.63026 34.4414 5.83277 34.5363C15.5641 39.0968 28.4146 39.0967 38.1668 34.5356C38.3695 34.4408 38.5 34.2382 38.5 34.0143V30.8613C38.5 30.4293 38.0407 30.1524 37.6585 30.3538C27.2857 35.8176 17.3868 36.0955 6.3386 30.3364C5.95684 30.1374 5.5 30.4149 5.5 30.8454H5.5Z"
            fill="#FF3998"
          />
        </svg>
      ),
    },
    {
      color: '#1C08FD',
      icon: (
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5232 20.548C18.3007 20.548 18.9311 19.9177 18.9311 19.1401C18.9311 18.3625 18.3007 17.7322 17.5232 17.7322C16.7456 17.7322 16.1152 18.3625 16.1152 19.1401C16.1152 19.9177 16.7456 20.548 17.5232 20.548Z"
            fill="#1C08FD"
          />
          <path
            d="M26.4685 26.2624C27.2461 26.2624 27.8764 25.632 27.8764 24.8545C27.8764 24.0769 27.2461 23.4465 26.4685 23.4465C25.6909 23.4465 25.0605 24.0769 25.0605 24.8545C25.0605 25.632 25.6909 26.2624 26.4685 26.2624Z"
            fill="#1C08FD"
          />
          <path
            d="M38.0758 23.8604L37.5651 23.1634C37.0129 22.4042 36.9991 21.3759 37.5444 20.6029L38.0413 19.8989C38.8004 18.8222 38.4485 17.3246 37.2821 16.6965L36.5229 16.2893C35.6947 15.8476 35.2392 14.9228 35.3979 13.9911L35.5429 13.1422C35.7637 11.8447 34.7906 10.6438 33.4724 10.5886L32.6097 10.5541C31.6711 10.5127 30.8567 9.87773 30.5944 8.97362L30.3529 8.14542C29.9871 6.87552 28.5929 6.21987 27.3783 6.74439L26.5846 7.08257C25.7219 7.45526 24.7142 7.23441 24.0862 6.53044L23.5133 5.88859C22.6368 4.90856 21.0978 4.91546 20.2282 5.91619L19.6622 6.56495C19.0411 7.27582 18.0403 7.51047 17.1707 7.15159L16.3701 6.82031C15.1486 6.31649 13.7682 6.99975 13.4162 8.26965L13.1885 9.10475C12.94 10.0158 12.1394 10.6645 11.2008 10.7128L10.3381 10.7611C9.01991 10.8371 8.06748 12.0517 8.30904 13.3493L8.46778 14.1982C8.64032 15.123 8.19861 16.0547 7.37732 16.5102L6.62504 16.9312C5.47247 17.5731 5.14119 19.0776 5.92108 20.1405L6.4318 20.8375C6.98393 21.5967 6.99773 22.625 6.4525 23.398L5.95558 24.102C5.1964 25.1786 5.54839 26.6763 6.71476 27.3044L7.47394 27.7115C8.30214 28.1533 8.75765 29.0781 8.59891 30.0098L8.45397 30.8587C8.23312 32.1562 9.20625 33.3571 10.5245 33.4123L11.3872 33.4468C12.3258 33.4882 13.1402 34.1232 13.4024 35.0273L13.644 35.8555C14.0098 37.1254 15.4039 37.781 16.6186 37.2565L17.4123 36.9183C18.275 36.5456 19.2826 36.7665 19.9107 37.4705L20.4835 38.1123C21.3669 39.0923 22.906 39.0854 23.7687 38.0847L24.3346 37.4359C24.9558 36.7251 25.9565 36.4904 26.8261 36.8493L27.6267 37.1806C28.8483 37.6844 30.2286 37.0011 30.5806 35.7312L30.8084 34.8961C31.0568 33.9851 31.8574 33.3364 32.796 33.2881L33.6587 33.2398C34.9769 33.1638 35.9294 31.9492 35.6878 30.6516L35.5291 29.8027C35.3565 28.8779 35.7982 27.9462 36.6195 27.4907L37.3718 27.0697C38.5244 26.4347 38.8557 24.9302 38.0758 23.8604ZM14.1202 19.1397C14.1202 17.2625 15.6386 15.7441 17.5158 15.7441C19.3931 15.7441 20.9114 17.2625 20.9114 19.1397C20.9114 21.017 19.3931 22.5353 17.5158 22.5353C15.6386 22.5353 14.1202 21.0101 14.1202 19.1397ZM18.1715 27.8979C17.8816 28.2499 17.3571 28.2982 17.0051 28.0083C16.6531 27.7184 16.6048 27.1939 16.8947 26.8419L25.8047 16.1099C26.0945 15.7579 26.6191 15.7096 26.9711 15.9995C27.323 16.2893 27.3713 16.8139 27.0815 17.1659L18.1715 27.8979ZM26.4672 28.2499C24.59 28.2499 23.0716 26.7315 23.0716 24.8543C23.0716 22.977 24.59 21.4587 26.4672 21.4587C28.3445 21.4587 29.8628 22.977 29.8628 24.8543C29.8628 26.7315 28.3445 28.2499 26.4672 28.2499Z"
            fill="#1C08FD"
          />
        </svg>
      ),
    },
  ];

  const [toggleCategoriesId, setToggleCategoriesId] = useState<
    number | boolean
  >(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCouponsAsync());
    dispatch(getCategoriesAsync());
    dispatch(getMainImgAsinc());
  }, [dispatch]);

  const { coupons, categories, mainImg } = useAppSelector((state) => state);
  const handleChangeCategories = (id: number | boolean) => {
    setToggleCategoriesId(toggleCategoriesId === id ? false : id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.categoriesFlexContainer}>
        {categories?.img?.map((it: Icategories, idx: number) => {
          return (
            <Categories
              key={it.id}
              it={it}
              handleChangeCategories={handleChangeCategories}
              setToggleCategoriesId={setToggleCategoriesId}
              color={categoriesColors[idx]}
              toggleCategoriesId={toggleCategoriesId}
            />
          );
        })}
      </div>

      <h3 className={styles.mainTitle}>Новые купоны</h3>
      <div className={styles.cardFlexContainer}>
        {coupons.coupon.slice(0, 8).map((it: Icoupon) => {
          return <Card key={it.id} it={it} />;
        })}
      </div>

      <button className={styles.mainBtn}>Посмотреть все</button>

      <Carousel />

      <div className={styles.mainImgBox}>
        {mainImg.img.map((it: ImainImg) => {
          return (
            <>
              <div className="mainImg">
                <img src={it.image} alt="Image"/>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
