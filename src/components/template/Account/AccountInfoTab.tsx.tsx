import {Button, Input } from "components/ui";
import { useAuth } from "hooks/useAuth";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
// import { PATH } from "constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountSchema, AccountSchemaType } from "schema";
import { useAppDispatch } from "store";
import { getUserThunk, updateUserThunk } from "store/quanLyNguoiDung/thunk";
import { toast } from "react-toastify";
import { UserInfo } from "types/QuanLyNguoiDung";


const AccountInfoTab = () => {
  let { user } = useAuth(); 
  user = user as UserInfo;
  const navigate = useNavigate();
  const { reset, register, handleSubmit,formState:{errors} } = useForm<AccountSchemaType>({
    mode:'onChange', resolver: zodResolver(AccountSchema),
  });
  const dispatch = useAppDispatch()
  const {isUpdateUser}= useAuth()

  useEffect(() => {
    dispatch(getUserThunk());
    reset(
        {
       ...user,
         soDt: user?.soDT,
     }
    );
  }, [user, reset]);
  const onSubmit:SubmitHandler<AccountSchemaType> = (value)=>{
    dispatch(updateUserThunk(value)).unwrap().then(() => {
        toast.success("Update success");    
          })
          .catch((err) => {
           console.log(err);
          })
  }

  return (
    <form className="w-[40vw] px-10 text-white" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative opacity-70">
        {/* Bỏ InputS vào div để không bị xung đột với AntDesign và có thể CSS lại được thẻ */}
        <div className="z-[2] cursor-not-allowed w-full h-full absolute"></div>
        <InputS label="Tài khoản" name="taiKhoan" register={register} error={errors?.taiKhoan?.message}  disabled   />
        </div>
      <InputS label="Mật khẩu" name="matKhau" register={register} error={errors?.matKhau?.message} type="password" />
      <InputS label="Họ và tên" name="hoTen" register={register}  error={errors?.hoTen?.message}/>
      <InputS label="Số điện thoại" name="soDt" register={register}  error={errors?.soDt?.message}/>
      <InputS label="Email" name="email" register={register}  error={errors?.email?.message}/>
      <InputS label="Mã nhóm" name="maNhom" register={register}  error={errors?.maNhom?.message}/>
      <div className="relative opacity-70">
      <div className="z-[2] cursor-not-allowed w-full h-full absolute"></div>
      <InputS label="Mã người dùng" name="maLoaiNguoiDung" register={register}  error={errors?.maLoaiNguoiDung?.message}  disabled />
</div>

      <div className="text-right">
        <Button
          className="mt-[60px] w-[200px] !h-[40px] mb-[20px] mr-10  !text-white bg-red-500"
          type="primary"
          danger
          htmlType="button"
          onClick={() => navigate("/")}
        >
          Hủy
        </Button>

        <Button
          loading={isUpdateUser}
          className="mt-[60px] w-[200px] !h-[40px] mb-[20px]"
          type="primary"
          htmlType="submit"
        >
          Lưu thay đổi
        </Button>
      </div>
    </form>
  );
};

export default AccountInfoTab;

const InputS = styled(Input)`
  margin-top: 20px;
  input {
    color: red !important;  
  }
  p{
    color: white !important;
  }
`;
