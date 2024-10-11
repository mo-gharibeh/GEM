using GEM.Server.DTOs;
using GEM.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClasseController : ControllerBase
    {
        private readonly MyDbContext _db;
        public ClasseController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllClasses")]
        public IActionResult GetAllClasses()
        {
            var classe = _db.ClassAndGyms.Where(x => x.Flag == false).ToList();
            return Ok(classe);
        }

        [HttpGet("GetClasseDetails/{id}")]
        public IActionResult GetClasses(int id)
        {
            var classe =_db.ClassAndGyms.Where(x => x.Id == id).ToList();
            return Ok(classe);
        }





        // For Admin Side To Add Gym
        [HttpPost("Addclass")]
        public IActionResult Addclass(ClasseDTO classedto)
        {
            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

            if (!Directory.Exists(folder))
            {

                Directory.CreateDirectory(folder);
            }

            var fileImage = Path.Combine(folder, classedto.Image.FileName);

            using (var stream = new FileStream(fileImage, FileMode.Create))
            {

                classedto.Image.CopyToAsync(stream);

            }

            var classe = new ClassAndGym
            {
                Name = classedto.Name,
                Description = classedto.Description,
                Price = classedto.Price,
                Flag = false,
                Image = classedto.Image.FileName,
                Trainer = classedto.Trainer,

            };

            _db.ClassAndGyms.Add(classe);
            _db.SaveChanges();


            if (classedto.dTO != null)
            {
                var classTime = new ClassTime
                {
                    ClassId = classe.Id,  // Assuming `Id` is generated after saving class
                    StartTime = classedto.dTO.StartTime,
                    EndTime = classedto.dTO.EndTime
                };

                _db.ClassTimes.Add(classTime);
                _db.SaveChanges();
            }


            return Ok();
        }


        // For Admin Side To Edit Gym
        [HttpPut("EditClass")]
        public IActionResult editClass(int id, [FromForm] ClasseDTO classedto)
        {
            var classe = _db.ClassAndGyms.FirstOrDefault(x => x.Id == id);
            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

            if (!Directory.Exists(folder))
            {

                Directory.CreateDirectory(folder);
            }

            var fileImage = Path.Combine(folder, classedto.Image.FileName);

            using (var stream = new FileStream(fileImage, FileMode.Create))
            {

                classedto.Image.CopyToAsync(stream);

            }

            classe.Name = classedto.Name;
            classe.Description = classedto.Description;
            classe.Image = classedto.Image.FileName;
            classe.Price = classedto.Price;
            classe.Trainer = classedto.Trainer;

            _db.ClassAndGyms.Update(classe);
            _db.SaveChanges();
            return Ok();
        }


        // For Admin Side To Delete Gym
        [HttpDelete("DeleteClass")]
        public IActionResult deleteClass(int id)
        {

            var classe = _db.ClassAndGyms.FirstOrDefault(x => x.Id == id);

            if (classe == null)
            {
                return BadRequest();
            }

            _db.ClassAndGyms.Remove(classe);
            _db.SaveChanges();
            return Ok();
        }
    }
}
