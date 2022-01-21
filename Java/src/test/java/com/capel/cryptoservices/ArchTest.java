package com.capel.cryptoservices;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.capel.cryptoservices");

        noClasses()
            .that()
            .resideInAnyPackage("com.capel.cryptoservices.service..")
            .or()
            .resideInAnyPackage("com.capel.cryptoservices.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..com.capel.cryptoservices.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
