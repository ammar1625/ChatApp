using ChatAppBusinessLayer;
using ChatAppDataAccess;
using ChatAppDataAccess.Dto_s;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebSocketSharp.Server;

namespace ChatAppServer.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UserApi : ControllerBase
    {
        [HttpGet("UserId/{UserId}", Name = "GetUserById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetUserById(int UserId)
        {
            
            if (UserId <= 0 || UserId == null)
            {
                return BadRequest("invalid data");
            }

            clsUser UserToFind = clsUser.GetuserById(UserId);

            if (UserToFind == null)
            {
                return Ok(null);
            }

           

            string? Base64Image = null;
            string? ContentType = null;

            //handle the user image if it's not null
            if (UserToFind.ProfilePic != null)
            {
                MemoryStream memoryStream = new MemoryStream();
                UserToFind.ProfilePic.CopyTo(memoryStream);

                byte[] ImageBytes = memoryStream.ToArray();
                Base64Image = Convert.ToBase64String(ImageBytes);


                ContentType = UserData.GetMimeType(UserToFind.ProfilePic.FileName);

                //dispose the stream to don't keep it open for the next use
                //UserData.stream.Dispose();
                //memoryStream.Dispose();
            }
            return Ok(UserToFind.userDto);
            return Ok(new
            {
                UserId = UserToFind.UserId,
                FirstName = UserToFind.FirstName,
                LastName = UserToFind.LastName,
                UserName = UserToFind.UserName,
                PassWord = UserToFind.PassWord,
                DateOfBirth = UserToFind.DateOfBirth,
                Gender = UserToFind.Gender,
                PhoneNumber = UserToFind.PhoneNumber,
                Email = UserToFind.Email,
                IsActive = UserToFind.IsActive,
                ProfilePic = new { Image = Base64Image, ContentType = ContentType },
                Messages = UserToFind.Messages,
                Conversations = new {user1 = UserToFind.ConversationsAsUser1 , user2 = UserToFind.ConversationsAsUser2}
            });


        }

        [HttpGet("login", Name = "LogIn")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult LogIn(string Email , string PassWord)
        {
            if(string.IsNullOrEmpty(Email) || string.IsNullOrEmpty(PassWord)||string.IsNullOrWhiteSpace(Email)||string.IsNullOrWhiteSpace(PassWord))
            {
                return BadRequest("invalid data");
            }

            clsUser User = clsUser.LogIn(Email, PassWord);
            if (User == null)
            {
                return Ok(null);
            }

            //handle user image
            string? Base64Image = null;
            string? ContentType = null;

            if(User.ProfilePic != null)
            {
                MemoryStream stream = new MemoryStream();
                User.ProfilePic.CopyTo(stream);

                byte[] bytes = stream.ToArray();
                Base64Image = Convert.ToBase64String(bytes);
                ContentType = UserData.GetMimeType(User.ProfilePic.ContentType);

                stream.Dispose();
                UserData.stream.Dispose();
            }

            return   Ok(new
            {
                UserId = User.UserId,
                FirstName = User.FirstName,
                LastName = User.LastName,
                UserName = User.UserName,
                PassWord = User.PassWord,
                DateOfBirth = User.DateOfBirth,
                Gender = User.Gender,
                PhoneNumber = User.PhoneNumber,
                Email = User.Email,
                IsActive = User.IsActive,
                ProfilePic = new { Image = Base64Image, ContentType = ContentType },
                Messages = User.Messages,
                Conversations = new { user1 = User.ConversationsAsUser1, user2 = User.ConversationsAsUser2 }

            });
        }

        [HttpPost("AddNewUser")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult AddNewUser([FromForm] UserDto NewUser)
        {
            if(NewUser == null || (string.IsNullOrEmpty(NewUser.FirstName)||string.IsNullOrWhiteSpace(NewUser.FirstName)||
               string.IsNullOrEmpty(NewUser.LastName) || string.IsNullOrWhiteSpace(NewUser.LastName)||
               string.IsNullOrEmpty(NewUser.UserName) || string.IsNullOrWhiteSpace(NewUser.UserName)||
               string.IsNullOrEmpty(NewUser.PassWord) || string.IsNullOrWhiteSpace(NewUser.PassWord))||
               NewUser.DateOfBirth==null || NewUser.Gender == null ||
               string.IsNullOrEmpty(NewUser.PhoneNumber) || string.IsNullOrWhiteSpace(NewUser.PhoneNumber)||
                string.IsNullOrEmpty(NewUser.Email) || string.IsNullOrWhiteSpace(NewUser.Email)
               )
            {
                return BadRequest("invalid data");
            }

            clsUser User = new clsUser(new UserDto(NewUser.UserId , NewUser.FirstName , NewUser.LastName , NewUser.UserName , NewUser.PassWord,
                NewUser.ProfilePic != null ? NewUser.ProfilePic : null , NewUser.DateOfBirth , NewUser.Gender , NewUser.PhoneNumber , NewUser.Email),clsUser.EnMode.AddNew);

            if(User.Save())
            {
                return CreatedAtRoute("GetUserById", new { UserId = User.UserId }, User.userDto);
            }

            return StatusCode(500, "internal server error");
        }

        [HttpPut("UpdateUser/UserId/{UserId}",Name ="UpdateUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateUser(int UserId ,[FromForm] UserDto UpdatedUser)
        {
            if (UserId <=0 || UserId == null|| UpdatedUser == null || (string.IsNullOrEmpty(UpdatedUser.FirstName) || string.IsNullOrWhiteSpace(UpdatedUser.FirstName) ||
              string.IsNullOrEmpty(UpdatedUser.LastName) || string.IsNullOrWhiteSpace(UpdatedUser.LastName) ||
              string.IsNullOrEmpty(UpdatedUser.UserName) || string.IsNullOrWhiteSpace(UpdatedUser.UserName) ||
              UpdatedUser.DateOfBirth == null || UpdatedUser.Gender == null ||
              string.IsNullOrEmpty(UpdatedUser.PhoneNumber) || string.IsNullOrWhiteSpace(UpdatedUser.PhoneNumber) ||
               string.IsNullOrEmpty(UpdatedUser.Email) || string.IsNullOrWhiteSpace(UpdatedUser.Email)
              ))
            {
                return BadRequest("invalid data");
            }

            clsUser User = clsUser.GetuserById(UserId);


            if (User == null)
            {
                return NotFound($"user with id {UserId} is not found");
            }
            string OldUserPic = "";
            if (User.ProfilePic != null)
            {
                 OldUserPic = User.ProfilePic.FileName;

            }
            string FilePath = Path.Combine(UserData.ImagesDirectory, OldUserPic);

            User.FirstName = UpdatedUser.FirstName;
            User.LastName = UpdatedUser.LastName;
            User.UserName = UpdatedUser.UserName;
            User.ProfilePic = UpdatedUser.ProfilePic;
            User.DateOfBirth = UpdatedUser.DateOfBirth;
            User.Gender = UpdatedUser.Gender;
            User.PhoneNumber = UpdatedUser.PhoneNumber;
            User.Email = UpdatedUser.Email;

            //dispose the stream to don't keep it open for the next use
            if(UserData.stream != null)
            UserData.stream.Dispose();
            
            if (User.Save())
            {
                if (System.IO.File.Exists(FilePath))
                {
                    System.IO.File.Delete(FilePath);
                }
                return Ok(User.userDto);
            }
            else
            {
                return StatusCode(500, "internal server error");
            }

        }

        [HttpGet("IsUserExistsByEmail/{Email}",Name ="CheckUserByEmail")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult IsUserExistsByEmail(string Email)
        {
            if(Email == null || string.IsNullOrEmpty(Email) || string.IsNullOrWhiteSpace(Email))
            {
                return BadRequest("invalid data");
            }

            var Result = clsUser.IsUserExistsByEmail(Email);
            return Ok(Result);
        }

        [HttpGet("IsUserExistsByUserName/{UserName}", Name = "CheckUserByUserName")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult IsUserExistsByUserName(string UserName)
        {
            if (UserName == null || string.IsNullOrEmpty(UserName) || string.IsNullOrWhiteSpace(UserName))
            {
                return BadRequest("invalid data");
            }

            var Result = clsUser.IsUserExistsByUserName(UserName);
            return Ok(Result);
        }


        [HttpGet("IsUserExistsByPhoneNumber/{PhoneNumber}", Name = "CheckUserByPhoneNumber")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult IsUserExistsByPhoneNumber(string PhoneNumber)
        {
            if (PhoneNumber == null || string.IsNullOrEmpty(PhoneNumber) || string.IsNullOrWhiteSpace(PhoneNumber))
            {
                return BadRequest("invalid data");
            }

            var Result = clsUser.IsUserExistsByPhoneNumber(PhoneNumber);
            return Ok(Result);
        }

        [HttpPut("ChangePassWord",Name ="ChangeUserPassWord")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult ChangeUserPassWord(int UserId, string PassWord)
        {
            if((UserId == null || UserId <= 0)|| string.IsNullOrEmpty(PassWord)|| string.IsNullOrWhiteSpace(PassWord))
            {
                return BadRequest("invalid data");
            }

            clsUser User = clsUser.GetuserById(UserId);
            if (User == null) 
            {
                return NotFound($"user with id {UserId} is not found");
            }
            
            User.PassWord = PassWord;

            //every time i call getuser i should dispose the user image to keep it available for the next use
            //because getuser methode open the user image stream
            if (UserData.stream != null)
                UserData.stream.Dispose();

            if (User.ChangePassWord())
            {
                //return the updated user object without profile pic
                return Ok(new
                {
                    UserId = User.UserId,
                    FirstName = User.FirstName,
                    LastName = User.LastName,
                    UserName = User.UserName,
                    PassWord = User.PassWord,
                    DateOfBirth = User.DateOfBirth,
                    Gender = User.Gender,
                    PhoneNumber = User.PhoneNumber,
                    Email = User.Email,
                    IsActive = User.IsActive,
                    
                });

            }
            else
                return StatusCode(500, "internal server error");
        }


        [HttpDelete("DeleteUser/{UserId}",Name ="DeleteUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DeleteUser(int UserId)
        {
            if (UserId <= 0 || UserId == null)
                return BadRequest("invalid data");

            clsUser User = clsUser.GetuserById(UserId);

            if (User == null)
                return NotFound($"user with id {UserId} is not found");

            //if (UserData.stream != null)
            //    UserData.stream.Dispose();

            if (clsUser.DeleteUserById(UserId))
            {
                return Ok(true);
            }
            else
                return StatusCode(500, "internal server error");
        }

        [HttpGet("UserFilter/{UserNameQuery}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult FilterUsersByUserName(string UserNameQuery)
        {
            if (string.IsNullOrEmpty(UserNameQuery) || string.IsNullOrWhiteSpace(UserNameQuery))
                return BadRequest("invalid data");

            List<UserDto> Users = clsUser.FilterUsersByUserName(UserNameQuery);
            List<object> UsersToReturn = new List<object>();
            foreach(UserDto user in Users)
            {
                string? Base64Image = null;
                string? ContentType = null;

                if(user.ProfilePic != null)
                {
                    MemoryStream stream = new MemoryStream();
                    user.ProfilePic.CopyTo(stream);

                    byte[] Imagebytes = stream.ToArray();
                    Base64Image = Convert.ToBase64String(Imagebytes);
                    ContentType = UserData.GetMimeType(user.ProfilePic.FileName);
                    UsersToReturn.Add(new
                    {
                        UserId = user.UserId,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        UserName = user.UserName,
                        PassWord = user.PassWord,
                        DateOfBirth = user.DateOfBirth,
                        Gender = user.Gender,
                        PhoneNumber = user.PhoneNumber,
                        Email = user.Email,
                        IsAvtive = user.IsActive,
                        ProfilePic = new {Image = Base64Image ,ContentType },
                        Messages = user.Messages,
                        Conversations = new {user1 = user.ConversationsAsUser1 , user2 = user.ConversationsAsUser2 }
                    });
                }
                else
                {
                    UsersToReturn.Add(new
                    {
                        UserId = user.UserId,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        UserName = user.UserName,
                        PassWord = user.PassWord,
                        DateOfBirth = user.DateOfBirth,
                        Gender = user.Gender,
                        PhoneNumber = user.PhoneNumber,
                        Email = user.Email,
                        IsAvtive = user.IsActive,
                        ProfilePic = new { Image = Base64Image, ContentType },
                        Messages = user.Messages,
                        Conversations = new { user1 = user.ConversationsAsUser1, user2 = user.ConversationsAsUser2 }

                    });
                }
            }

            //check if the filestream list has streams then dispose them all
            if(Users.Count>0)
            {
                foreach( FileStream stream in UserData.Files)
                {
                    stream.Dispose();
                }

                UserData.Files.Clear();
            }

            return Ok(UsersToReturn);
        }
    }
}
