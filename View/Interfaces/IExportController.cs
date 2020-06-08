using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace View.Interfaces
{
    public interface IExportController
    {
        IActionResult GetXLSX();
    }
}
