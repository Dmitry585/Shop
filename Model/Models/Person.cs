namespace Model.Models
{
    public class Person : Model
    {
        public int PersonId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }

        public Role Role { get; set; }  
    }
}
